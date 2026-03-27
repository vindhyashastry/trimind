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
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(docs, null, 2));
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

export async function queryNamespace(
  vector: number[],
  filter: Record<string, any>,
  topK: number = 5,
  queryText?: string
) {
  if (pc && vector.length > 0) {
    const index = pc.index(process.env.PINECONE_INDEX!);
    const queryResponse = await index.query({
      vector,
      filter: {
        accessKey: { $eq: filter.accessKey },
        ...(filter.parentDocumentId ? { parentDocumentId: { $eq: filter.parentDocumentId } } : {})
      },
      topK,
      includeMetadata: true,
    });
    return queryResponse.matches;
  } else {
    // Local search
    const docs = getLocalDb();
    const filteredDocs = docs.filter(d => {
      // Must match accessKey if provided
      if (filter.accessKey && d.metadata.accessKey?.toLowerCase() !== filter.accessKey?.toLowerCase()) {
        return false;
      }
      
      // If parentDocumentId is provided (for comparison feature), it must match
      if (filter.parentDocumentId && d.metadata.parentDocumentId !== filter.parentDocumentId) {
        return false;
      }

      // Domain filtering is now a "preference" but not a hard requirement if accessKey matches
      // This prevents "No document found" if the domain was changed or mislabeled
      return true;
    });

    // If no docs at all for this key, return empty
    if (filteredDocs.length === 0) return [];

    // If no query text or it's a "summarize everything" type query, return top chunks
    const VAGUE_PATTERNS = /^(summarize|overview|tell me|what is|what's|list).*(document|file|content|everything|all|this|there|available)/i;
    if (!queryText || VAGUE_PATTERNS.test(queryText.trim())) {
      return filteredDocs.slice(0, topK).map(s => ({
        id: s.id,
        score: 1,
        metadata: s.metadata
      }));
    }

    const keywords = queryText.toLowerCase().split(/\s+/).filter(k => k.length > 2);

    const matched = filteredDocs.map(doc => {
      let score = 0;
      const content = (doc.text + " " + (doc.metadata.fileName || "")).toLowerCase();
      keywords.forEach(kw => {
        if (content.includes(kw)) score += 1;
      });
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

// Get a specific chunk by ID
export async function getChunkById(chunkId: string): Promise<{ id: string; metadata: Record<string, any> } | null> {
  if (pc) {
    // For Pinecone, we'd need to fetch by ID directly
    // This is a simplified version
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
    // Local search
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

// Get all chunks for a document
export async function getChunksByDocumentId(documentId: string, accessKey: string): Promise<Array<{ id: string; metadata: Record<string, any> }>> {
  if (pc) {
    // For Pinecone, we'd need to query with filter
    // This would require a vector, so we use a dummy vector for filtering
    try {
      const index = pc.index(process.env.PINECONE_INDEX!);
      const queryResponse = await index.query({
        vector: new Array(768).fill(0), // Dummy vector
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
    // Local search
    const docs = getLocalDb();
    return docs
      .filter(d => d.metadata.parentDocumentId === documentId && d.metadata.accessKey === accessKey)
      .map(d => ({
        id: d.id,
        metadata: d.metadata
      }));
  }
}
