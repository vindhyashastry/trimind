import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
import prisma from "@/lib/prisma";

const PINECONE_KEY = process.env.PINECONE_API_KEY;
const pc = PINECONE_KEY ? new Pinecone({ apiKey: PINECONE_KEY }) : null;

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export async function getEmbeddings(text: string): Promise<number[]> {
  if (!ai) {
    console.warn("No GEMINI_API_KEY provided. Returning empty vector (fallback to keyword search).");
    return [];
  }
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text.replace(/\n/g, " "),
    });
    return response.embeddings?.[0]?.values || [];
  } catch (error) {
    console.error("Gemini embedding error:", error);
    return [];
  }
}

export async function upsertDocument(
  id: string,
  vector: number[],
  metadata: Record<string, any>
) {
  if (pc && vector.length > 0) {
    const index = pc.index(process.env.PINECONE_INDEX!);
    await index.upsert({ records: [{ id, values: vector, metadata }] });
  } else {
    await prisma.vectorChunk.upsert({
      where: { id },
      update: {
        text: metadata.text || "",
        accessKey: metadata.accessKey || "",
        fileName: metadata.fileName || "",
        domain: metadata.domain || null,
        assistantName: metadata.assistantName || null,
        chunkIndex: metadata.chunkIndex ?? null,
        pageNumber: metadata.pageNumber ?? null,
        startLine: metadata.startLine ?? null,
        endLine: metadata.endLine ?? null,
        parentDocumentId: metadata.parentDocumentId || null,
        vectorJson: JSON.stringify(vector),
      },
      create: {
        id,
        text: metadata.text || "",
        accessKey: metadata.accessKey || "",
        fileName: metadata.fileName || "",
        domain: metadata.domain || null,
        assistantName: metadata.assistantName || null,
        chunkIndex: metadata.chunkIndex ?? null,
        pageNumber: metadata.pageNumber ?? null,
        startLine: metadata.startLine ?? null,
        endLine: metadata.endLine ?? null,
        parentDocumentId: metadata.parentDocumentId || null,
        vectorJson: JSON.stringify(vector),
      },
    });
  }
}

export async function upsertDocumentBatch(
  records: Array<{ id: string; vector: number[]; metadata: Record<string, any> }>
) {
  if (pc) {
    const index = pc.index(process.env.PINECONE_INDEX!);
    const vectors = records
      .map((r) => ({ id: r.id, values: r.vector, metadata: r.metadata }))
      .filter((v) => v.values.length > 0);
    if (vectors.length > 0) {
      for (let i = 0; i < vectors.length; i += 100) {
        await index.upsert({ records: vectors.slice(i, i + 100) });
      }
    }
  } else {
    // Batch insert into PostgreSQL
    const data = records.map((r) => ({
      id: r.id,
      text: r.metadata.text || "",
      accessKey: r.metadata.accessKey || "",
      fileName: r.metadata.fileName || "",
      domain: r.metadata.domain || null,
      assistantName: r.metadata.assistantName || null,
      chunkIndex: r.metadata.chunkIndex ?? null,
      pageNumber: r.metadata.pageNumber ?? null,
      startLine: r.metadata.startLine ?? null,
      endLine: r.metadata.endLine ?? null,
      parentDocumentId: r.metadata.parentDocumentId || null,
      vectorJson: JSON.stringify(r.vector),
    }));
    // createMany with skipDuplicates for idempotency
    await prisma.vectorChunk.createMany({ data, skipDuplicates: true });
  }
}

export async function deleteDocument(documentId: string) {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      await index.deleteMany({
        filter: { parentDocumentId: { $eq: documentId } },
      });
    } catch (error) {
      console.error("Pinecone delete error:", error);
    }
  } else {
    await prisma.vectorChunk.deleteMany({
      where: { parentDocumentId: documentId },
    });
  }
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function calculateKeywordScore(text: string, fileName: string, queryText: string): number {
  const stopWords = new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","to","of","in","for","on","with","at","by","from","and","or","but","if","that","this","it","we","they","you","i","he","she"]);
  const keywords = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((k) => k.length > 2 && !stopWords.has(k));
  if (keywords.length === 0) return 0;
  const content = (text + " " + fileName).toLowerCase();
  let score = 0;
  keywords.forEach((kw) => {
    const exactCount = (content.match(new RegExp(`\\b${kw}\\b`, "g")) || []).length;
    score += exactCount * 2;
    if (content.includes(kw)) score += 1;
  });
  keywords.forEach((kw) => { if (fileName.toLowerCase().includes(kw)) score += 3; });
  return score / keywords.length;
}

export async function queryNamespace(
  vector: number[],
  filter: Record<string, any>,
  topK: number = 5,
  queryText?: string
) {
  if (pc && vector.length > 0) {
    const accessKeys = Array.isArray(filter.accessKey) ? filter.accessKey : [filter.accessKey];
    const index = pc.index(process.env.PINECONE_INDEX!);
    const queryResponse = await index.query({
      vector,
      filter: {
        accessKey: { $in: accessKeys },
        ...(filter.parentDocumentId ? { parentDocumentId: { $eq: filter.parentDocumentId } } : {}),
      },
      topK,
      includeMetadata: true,
    });
    return queryResponse.matches;
  }

  // PostgreSQL fallback
  const accessKeys: string[] = Array.isArray(filter.accessKey)
    ? filter.accessKey
    : [filter.accessKey].filter(Boolean);

  const chunks = await prisma.vectorChunk.findMany({
    where: {
      accessKey: { in: accessKeys },
      ...(filter.parentDocumentId ? { parentDocumentId: filter.parentDocumentId } : {}),
    },
  });

  if (chunks.length === 0) return [];

  // Score with cosine similarity if vector provided, otherwise keyword match
  const scored = chunks.map((chunk) => {
    let score = 0;
    if (vector && vector.length > 0) {
      const chunkVec: number[] = JSON.parse(chunk.vectorJson || "[]");
      if (chunkVec.length === vector.length) {
        score = dotProduct(vector, chunkVec);
      } else {
        score = calculateKeywordScore(chunk.text, chunk.fileName, queryText || "");
      }
    } else {
      score = calculateKeywordScore(chunk.text, chunk.fileName, queryText || "");
    }

    return {
      id: chunk.id,
      score,
      metadata: {
        text: chunk.text,
        accessKey: chunk.accessKey,
        fileName: chunk.fileName,
        domain: chunk.domain,
        assistantName: chunk.assistantName,
        chunkIndex: chunk.chunkIndex,
        pageNumber: chunk.pageNumber,
        startLine: chunk.startLine,
        endLine: chunk.endLine,
        parentDocumentId: chunk.parentDocumentId,
      },
    };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export async function getChunkById(
  chunkId: string
): Promise<{ id: string; metadata: Record<string, any> } | null> {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      const fetchResponse = await index.fetch({ ids: [chunkId] });
      if (fetchResponse.records?.[chunkId]) {
        return { id: chunkId, metadata: fetchResponse.records[chunkId].metadata || {} };
      }
    } catch (error) {
      console.error("Pinecone fetch error:", error);
    }
    return null;
  }

  const chunk = await prisma.vectorChunk.findUnique({ where: { id: chunkId } });
  if (!chunk) return null;
  return {
    id: chunk.id,
    metadata: {
      text: chunk.text,
      accessKey: chunk.accessKey,
      fileName: chunk.fileName,
      pageNumber: chunk.pageNumber,
      startLine: chunk.startLine,
      endLine: chunk.endLine,
      parentDocumentId: chunk.parentDocumentId,
    },
  };
}

export async function getChunksByDocumentId(
  documentId: string,
  accessKey: string
): Promise<Array<{ id: string; metadata: Record<string, any> }>> {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      const queryResponse = await index.query({
        vector: new Array(768).fill(0),
        filter: { parentDocumentId: { $eq: documentId }, accessKey: { $eq: accessKey } },
        topK: 100,
        includeMetadata: true,
      });
      return queryResponse.matches.map((m) => ({ id: m.id, metadata: m.metadata || {} }));
    } catch (error) {
      console.error("Pinecone query error:", error);
      return [];
    }
  }

  const chunks = await prisma.vectorChunk.findMany({
    where: { parentDocumentId: documentId, accessKey },
  });
  return chunks.map((c) => ({
    id: c.id,
    metadata: {
      text: c.text,
      accessKey: c.accessKey,
      fileName: c.fileName,
      pageNumber: c.pageNumber,
      startLine: c.startLine,
      endLine: c.endLine,
      parentDocumentId: c.parentDocumentId,
    },
  }));
}
