const OLLAMA_BASE_URL = "http://localhost:11434";

async function testOllama() {
    console.log("Testing Ollama Connection...");
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
        if (res.ok) {
            const data = await res.json();
            console.log("Ollama is RUNNING. Available models:", data.models.map((m: any) => m.name));
        } else {
            console.error("Ollama is NOT responding correctly.");
        }
    } catch (e) {
        console.error("Ollama is NOT running or unreachable at", OLLAMA_BASE_URL);
    }

    console.log("\nTesting Embeddings (nomic-embed-text)...");
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/embeddings`, {
            method: "POST",
            body: JSON.stringify({ model: "nomic-embed-text", prompt: "Hello world" })
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Embeddings SUCCESS. Vector length:", data.embedding.length);
        } else {
            console.error("Embeddings FAILED.");
        }
    } catch (e) {
        console.error("Embeddings error:", e);
    }

    console.log("\nTesting Chat (llama3)...");
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
            method: "POST",
            body: JSON.stringify({
                model: "llama3",
                messages: [{ role: "user", content: "Say hello!" }],
                stream: false
            })
        });
        if (res.ok) {
            const data = await res.json();
            console.log("Chat SUCCESS. Response:", data.message.content);
        } else {
            console.error("Chat FAILED.");
        }
    } catch (e) {
        console.error("Chat error:", e);
    }
}

testOllama();
