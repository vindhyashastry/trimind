const fetch = require('node-fetch');

async function checkOllama() {
    console.log('Checking Ollama...');
    try {
        const res = await fetch('http://localhost:11434/api/tags');
        if (res.ok) {
            const data = await res.json();
            console.log('Ollama is UP');
            console.log('Available models:', data.models.map(m => m.name).join(', '));
        } else {
            console.log('Ollama returned error:', res.status);
        }
    } catch (err) {
        console.log('Ollama is DOWN:', err.message);
    }
}

checkOllama();
