// Standard imports
import * as xlsx from "xlsx";
// pdf-parse is a CommonJS module with a known issue in some environments.
// By adding it to serverExternalPackages in next.config.ts, we can use standard require.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdf = require("pdf-parse");

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

/**
 * Strip binary noise, PDF headers/trailers, non-printable characters, and
 * compressed stream artifacts that pdf-parse sometimes leaks into output.
 */
export function cleanText(raw: string): string {
    return raw
        // Remove PDF binary header/trailer markers and stream keywords
        .replace(/%PDF-[\d.]+/g, "")
        .replace(/%%EOF/g, "")
        .replace(/\bstream\b/g, "")
        .replace(/\bendstream\b/g, "")
        // Remove PDF object declarations like "1 0 obj", "<< /Length ... >>"
        .replace(/\d+ \d+ obj[\s\S]*?endobj/g, "")
        .replace(/<<[^>]*>>/g, "")
        // Remove xref tables
        .replace(/xref[\s\S]*?startxref/g, "")
        // Remove non-printable / control characters (keep newlines and tabs)
        // eslint-disable-next-line no-control-regex
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ")
        // Remove long runs of non-ASCII (binary blob remnants)
        .replace(/[^\x00-\x7F]{3,}/g, " ")
        // Collapse excess whitespace
        .replace(/[ \t]{3,}/g, " ")
        .replace(/\n{4,}/g, "\n\n")
        .trim();
}

/**
 * Returns true if more than 30% of the chunk is non-printable/binary noise.
 * Used to skip garbage chunks before embedding.
 */
export function isMostlyGarbage(text: string): boolean {
    if (!text || text.length < 10) return true;
    // Count non-ASCII / non-printable characters
    const nonPrintable = (text.match(/[^\x09\x0A\x0D\x20-\x7E]/g) || []).length;
    return nonPrintable / text.length > 0.30;
}

export async function parsePDF(buffer: Buffer): Promise<{ text: string, pages: { text: string, pageNumber: number }[] }> {
    const pages: { text: string, pageNumber: number }[] = [];

    // Custom page renderer — uses getTextContent() which returns clean structured text,
    // NOT raw binary stream data. This is the correct extraction path.
    const options = {
        pagerender: (pageData: any) => {
            return pageData.getTextContent().then((textContent: any) => {
                let lastY: number | undefined;
                let text = '';
                for (const item of textContent.items) {
                    if (lastY === item.transform[5] || !lastY) {
                        text += item.str;
                    } else {
                        text += '\n' + item.str;
                    }
                    lastY = item.transform[5];
                }
                const cleaned = cleanText(text);
                pages.push({ text: cleaned, pageNumber: pages.length + 1 });
                return cleaned;
            });
        }
    };

    await pdf(buffer, options);

    // Use our cleaned per-page text (NOT data.text which leaks raw binary streams)
    const fullText = pages.map(p => p.text).join("\n\n");
    return { text: fullText, pages };
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

export function chunkTextWithMetadata(
    text: string,
    size: number = 1000,
    overlap: number = 200,
    pageNumber?: number
): ChunkMetadata[] {
    const chunks: ChunkMetadata[] = [];
    const contextSize = 150;
    let start = 0;
    let chunkIndex = 0;

    const totalChunks = Math.ceil((text.length - overlap) / (size - overlap)) || 1;

    while (start < text.length) {
        const end = Math.min(start + size, text.length);
        const chunkText = text.slice(start, end);

        const precedingStart = Math.max(0, start - contextSize);
        const precedingText = text.slice(precedingStart, start);

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

        if (end === text.length) break;
        start = end - overlap;
        chunkIndex++;
    }

    return chunks;
}

export function findPageForChunk(
    chunkStart: number,
    chunkEnd: number,
    pages: { text: string, pageNumber: number }[]
): number | undefined {
    let currentOffset = 0;
    for (const page of pages) {
        const pageEnd = currentOffset + page.text.length;
        if (chunkStart >= currentOffset && chunkStart < pageEnd) {
            return page.pageNumber;
        }
        currentOffset = pageEnd;
    }
    return undefined;
}
