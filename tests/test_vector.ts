import fs from "fs";
import path from "path";

const LOCAL_DB_PATH = path.join(process.cwd(), "src", "lib", "local-db.json");

function getLocalDb() {
    if (!fs.existsSync(LOCAL_DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf-8"));
}

const docs = getLocalDb();
console.log("Total docs:", docs.length);

const accessKey = "DPA-B1UT4BLD";
const queryText = "summarize the document";

const filteredDocs = docs.filter((d: any) => d.metadata.accessKey === accessKey);
console.log(`Docs for key ${accessKey}:`, filteredDocs.length);

const VAGUE_PATTERNS = /^(summarize|summary|tell me|what is|what does|describe|overview|explain|show me|give me|list|outline)/i;
console.log("Regex match:", VAGUE_PATTERNS.test(queryText));

if (VAGUE_PATTERNS.test(queryText)) {
    console.log("Vague pattern matched. Returning:", filteredDocs.slice(0, 5).length, "chunks");
} else {
    console.log("No regex match.");
}
