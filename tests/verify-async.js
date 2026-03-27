const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const BASE_URL = 'http://localhost:3000';

async function verifyAsyncUpload() {
    console.log("=== Testing Async Document Pipeline ===\n");

    // 1. Create a dummy txt file to upload
    const dummyFilePath = path.join(__dirname, 'dummy-test.txt');
    fs.writeFileSync(dummyFilePath, "This is a dummy document for testing standard vector store embedding.");
    
    try {
         // We need an auth token first. Let's register a quick test user.
         console.log("1. Registering test user...");
         const email = `test-upload-${Date.now()}@test.com`;
         await fetch(`${BASE_URL}/api/auth/signup`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password: 'password123', name: 'Upload Tester' })
         });
         
         const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ email, password: 'password123' })
         });
         
         const loginData = await loginRes.json();
         const token = loginData.token;
         
         if (!token) throw new Error("Failed to get auth token");
         console.log("   ✅ User registered & logged in.\n");
         
         // 2. Upload Document
         console.log("2. Uploading document asynchronously...");
         const formData = new FormData();
         
         const fileBuffer = fs.readFileSync(dummyFilePath);
         formData.append('files', fileBuffer, {
             filename: 'dummy-test.txt',
             contentType: 'text/plain'
         });
         
         const accessKey = `DPA-TEST-${Date.now()}`;
         formData.append('domain', 'general');
         formData.append('assistantName', 'Async Test Assistant');
         formData.append('accessKey', accessKey);
         
         const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
             method: 'POST',
             headers: {
                 'Cookie': `auth-token=${token}`,
                 // In Node.js FormData, we MUST pass the auto-generated boundary headers
                 ...formData.getHeaders()
             },
             body: formData
         });
         
         const uploadData = await uploadRes.json();
         console.log("   Upload API Response:", uploadData);
         
         if (!uploadData.documents || uploadData.documents.length === 0) {
             throw new Error("API did not return registered documents.");
         }
         
         const docId = uploadData.documents[0].id;
         console.log(`   ✅ Document registered in PENDING state (ID: ${docId}).\n`);
         
         // 3. Poll Status
         console.log("3. Polling for processing completion...");
         let attempts = 0;
         let isSuccess = false;
         
         while (attempts < 10 && !isSuccess) {
             attempts++;
             await new Promise(r => setTimeout(r, 2000)); // wait 2s
             
             const statusRes = await fetch(`${BASE_URL}/api/documents?accessKey=${accessKey}`);
             const statusData = await statusRes.json();
             
             const docStatus = statusData.documents?.find(d => d.id === docId)?.status;
             console.log(`   [Attempt ${attempts}] Status: ${docStatus}`);
             
             if (docStatus === 'SUCCESS') {
                 isSuccess = true;
             } else if (docStatus === 'ERROR') {
                 throw new Error("Document processing failed!");
             }
         }
         
         if (isSuccess) {
             console.log("\n🚀 EVERYTHING WORKS! Document embedded asynchronously!");
         } else {
             throw new Error("Document processing timed out (never reached SUCCESS).");
         }

    } catch (err) {
         console.error("\n❌ TEST FAILED:");
         console.error(err);
    } finally {
         if (fs.existsSync(dummyFilePath)) {
             fs.unlinkSync(dummyFilePath);
         }
    }
}

verifyAsyncUpload();
