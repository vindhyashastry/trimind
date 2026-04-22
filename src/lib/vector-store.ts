import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import path from "path";

const PINECONE_KEY = process.env.PINECONE_API_KEY;

const pc = PINECONE_KEY ? new Pinecone({ apiKey: PINECONE_KEY }) : null;

const LOCAL_DB_PATH = path.join(process.cwd(), "src", "lib", "local-db.json");

interface LocalDoc {
  id: string;
  text: string;
  metadata: Record<string, any>;
}

function getLocalDb(): LocalDoc[] {
  if (!fs.existsSync(LOCAL_DB_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveLocalDb(docs: LocalDoc[]) {
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(docs));
}

export async function getEmbeddings(text: string) {
  // Use pure Ollama for embeddings since Groq doesn't offer embedding models
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const model = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

  try {
    const response = await fetch(`${ollamaBaseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: text.replace(/\n/g, " "),
      }),
    });

    if (!response.ok) throw new Error(`Ollama error: ${response.statusText}`);
    const data = await response.json();
    return data.embedding;
  } catch (error) {
    console.error("Local embedding error:", error);
    return []; // Fallback to keyword-only search if Ollama fails
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
    // Local Fallback
    const docs = getLocalDb();
    docs.push({ id, text: metadata.text, metadata });
    saveLocalDb(docs);
  }
}

/**
 * Optimized batch upsert for local DB to avoid O(N^2) file writes
 */
export async function upsertDocumentBatch(
  records: Array<{ id: string, vector: number[], metadata: Record<string, any> }>
) {
  if (pc) {
    const index = pc.index(process.env.PINECONE_INDEX!);
    const vectors = records.map(r => ({
      id: r.id,
      values: r.vector,
      metadata: r.metadata
    })).filter(v => v.values.length > 0);
    
    if (vectors.length > 0) {
      // Split into batches of 100 for Pinecone
      for (let i = 0; i < vectors.length; i += 100) {
        await index.upsert({ records: vectors.slice(i, i + 100) });
      }
    }
  } else {
    const docs = getLocalDb();
    records.forEach(r => {
      docs.push({ id: r.id, text: r.metadata.text, metadata: r.metadata });
    });
    saveLocalDb(docs);
  }
}

export async function deleteDocument(documentId: string) {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      await index.deleteMany({
        filter: { parentDocumentId: { $eq: documentId } }
      });
    } catch (error) {
      console.error("Pinecone delete error:", error);
    }
  } else {
    const docs = getLocalDb();
    const filteredDocs = docs.filter(d => d.metadata.parentDocumentId !== documentId);
    saveLocalDb(filteredDocs);
  }
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
        ...(filter.parentDocumentId ? { parentDocumentId: { $eq: filter.parentDocumentId } } : {})
      },
      topK,
      includeMetadata: true,
    });
    return queryResponse.matches;
  } else {
    // Local search
    const accessKeys = Array.isArray(filter.accessKey) 
      ? filter.accessKey.map(k => k.toLowerCase()) 
      : [filter.accessKey?.toLowerCase()];

    const docs = getLocalDb();
    const filteredDocs = docs.filter(d => {
      // Must match one of the accessKeys if provided
      if (accessKeys.length > 0 && accessKeys[0] && !accessKeys.includes(d.metadata.accessKey?.toLowerCase())) {
        return false;
      }
      
      // If parentDocumentId is provided (for comparison feature), it must match
      if (filter.parentDocumentId && d.metadata.parentDocumentId !== filter.parentDocumentId) {
        return false;
      }

      return true;
    });

    if (filteredDocs.length === 0) return [];

    const VAGUE_PATTERNS = /^(summarize|overview|tell me|what is|what's|list).*(document|file|content|everything|all|this|there|available)/i;
    if (!queryText || VAGUE_PATTERNS.test(queryText.trim())) {
      return filteredDocs.slice(0, topK).map(s => ({
        id: s.id,
        score: 1,
        metadata: s.metadata
      }));
    }

    const stopWords = new Set(["the","a","an","is","are","was","were","be","been","being","have","has","had","do","does","did","will","would","could","should","may","might","shall","can","need","dare","ought","used","to","of","in","for","on","with","at","by","from","up","about","into","through","during","before","after","above","below","between","and","or","but","if","then","that","this","these","those","it","its","we","our","they","their","you","your","i","my","me","him","his","her","she","he"]);
    
    const keywords = queryText.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(k => k.length > 2 && !stopWords.has(k));

    if (keywords.length === 0) {
      return filteredDocs.slice(0, topK).map(s => ({
        id: s.id, score: 1, metadata: s.metadata
      }));
    }

    const matched = filteredDocs.map(doc => {
      const content = (doc.text + " " + (doc.metadata.fileName || "")).toLowerCase();
      let score = 0;
      keywords.forEach(kw => {
        const exactCount = (content.match(new RegExp(`\\b${kw}\\b`, 'g')) || []).length;
        score += exactCount * 2;
        if (content.includes(kw)) score += 1;
      });
      const fileName = (doc.metadata.fileName || "").toLowerCase();
      keywords.forEach(kw => { if (fileName.includes(kw)) score += 3; });
      return { ...doc, score };
    }).filter(s => s.score > 0);

    return matched
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(s => ({
        id: s.id,
        score: s.score / keywords.length,
        metadata: s.metadata
      }));
  }
}

export async function getChunkById(chunkId: string): Promise<{ id: string; metadata: Record<string, any> } | null> {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      const fetchResponse = await index.fetch({ ids: [chunkId] });
      if (fetchResponse.records && fetchResponse.records[chunkId]) {
        return {
          id: chunkId,
          metadata: fetchResponse.records[chunkId].metadata || {}
        };
      }
    } catch (error) {
      console.error("Pinecone fetch error:", error);
    }
    return null;
  } else {
    const docs = getLocalDb();
    const doc = docs.find(d => d.id === chunkId);
    if (doc) {
      return {
        id: doc.id,
        metadata: doc.metadata
      };
    }
    return null;
  }
}

export async function getChunksByDocumentId(documentId: string, accessKey: string): Promise<Array<{ id: string; metadata: Record<string, any> }>> {
  if (pc) {
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      const queryResponse = await index.query({
        vector: new Array(768).fill(0),
        filter: {
          parentDocumentId: { $eq: documentId },
          accessKey: { $eq: accessKey }
        },
        topK: 100,
        includeMetadata: true,
      });
      return queryResponse.matches.map(m => ({
        id: m.id,
        metadata: m.metadata || {}
      }));
    } catch (error) {
      console.error("Pinecone query error:", error);
      return [];
    }
  } else {
    const docs = getLocalDb();
    return docs
      .filter(d => d.metadata.parentDocumentId === documentId && d.metadata.accessKey === accessKey)
      .map(d => ({
        id: d.id,
        metadata: d.metadata
      }));
  }
}
