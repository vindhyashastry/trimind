// We import from the internal lib path to avoid a known bug in pdf-parse@1.1.1's
// index.js, which tries to readFileSync a test file at module load time when
// module.parent is null (which is the case in Next.js / bundled environments).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse/lib/pdf-parse.js");
import * as xlsx from "xlsx";

export interface ChunkMetadata {
    text: string;
    precedingText: string;
    followingText: string;
    chunkIndex: number;
    totalChunks: number;
    pageNumber?: number;
    startOffset: number;
    endOffset: number;
}

export async function parsePDF(buffer: Buffer): Promise<{ text: string, pages: { text: string, pageNumber: number }[] }> {
    const pages: { text: string, pageNumber: number }[] = [];

    // Custom page renderer to capture text per page
    const options = {
        pagerender: (pageData: any) => {
            return pageData.getTextContent().then((textContent: any) => {
                let lastY, text = '';
                for (const item of textContent.items) {
                    if (lastY == item.transform[5] || !lastY) {
                        text += item.str;
                    }
                    else {
                        text += '\n' + item.str;
                    }
                    lastY = item.transform[5];
                }
                pages.push({ text, pageNumber: pages.length + 1 });
                return text;
            });
        }
    };

    const data = await pdf(buffer, options);
    return { text: data.text, pages };
}

export async function parseExcel(buffer: Buffer): Promise<string> {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    let content = "";
    workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        content += `Sheet: ${sheetName}\n`;
        content += xlsx.utils.sheet_to_txt(sheet) + "\n";
    });
    return content;
}

export function chunkText(text: string, size: number = 1000, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
        const end = Math.min(start + size, text.length);
        chunks.push(text.slice(start, end));
        start += size - overlap;
    }
    return chunks;
}

// New function: chunk text with rich metadata for citation verification
export function chunkTextWithMetadata(
    text: string,
    size: number = 1000,
    overlap: number = 200,
    pageNumber?: number
): ChunkMetadata[] {
    const chunks: ChunkMetadata[] = [];
    const contextSize = 150; // Characters of preceding/following context
    let start = 0;
    let chunkIndex = 0;

    // Calculate total chunks first
    const totalChunks = Math.ceil((text.length - overlap) / (size - overlap));

    while (start < text.length) {
        const end = Math.min(start + size, text.length);
        const chunkText = text.slice(start, end);

        // Get preceding context (up to 150 chars before this chunk)
        const precedingStart = Math.max(0, start - contextSize);
        const precedingText = text.slice(precedingStart, start);

        // Get following context (up to 150 chars after this chunk)
        const followingEnd = Math.min(text.length, end + contextSize);
        const followingText = text.slice(end, followingEnd);

        chunks.push({
            text: chunkText,
            precedingText,
            followingText,
            chunkIndex,
            totalChunks,
            pageNumber,
            startOffset: start,
            endOffset: end
        });

        start = end - overlap;
        chunkIndex++;
    }

    return chunks;
}

// Helper to find which page a chunk belongs to
export function findPageForChunk(
    chunkStart: number,
    chunkEnd: number,
    pages: { text: string, pageNumber: number }[]
): number | undefined {
    let currentOffset = 0;

    for (const page of pages) {
        const pageEnd = currentOffset + page.text.length;

        // Check if chunk starts in this page
        if (chunkStart >= currentOffset && chunkStart < pageEnd) {
            return page.pageNumber;
        }

        currentOffset = pageEnd;
    }

    return undefined;
}
