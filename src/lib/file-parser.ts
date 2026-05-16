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
