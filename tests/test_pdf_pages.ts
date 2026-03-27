import { parsePDF } from "../src/lib/file-parser";
import fs from "fs";
import path from "path";

async function test() {
    console.log("Testing parsePDF...");
    const samplePath = path.join(process.cwd(), "node_modules", "pdf-parse", "test", "data", "01-valid.pdf");
    if (!fs.existsSync(samplePath)) {
        console.log("Sample PDF not found at", samplePath);
        return;
    }
    const buffer = fs.readFileSync(samplePath);
    const result = await parsePDF(buffer);
    console.log("Total text length:", result.text.length);
    console.log("Total pages:", result.pages.length);
    if (result.pages.length > 0) {
        console.log("Page 1 snippet:", result.pages[0].text.slice(0, 100));
    }
}

test().catch(console.error);
