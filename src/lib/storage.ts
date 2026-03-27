import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

// Determine storage directory: locally we use .data/uploads
const UPLOADS_DIR = path.join(process.cwd(), '.data', 'uploads');

export interface StorageService {
    /**
     * Uploads a file buffer and returns a unique URI/URL for it.
     */
    uploadFile(fileName: string, buffer: Buffer): Promise<string>;

    /**
     * Downloads a file from the given URI.
     */
    downloadFile(fileUri: string): Promise<Buffer>;
    
    /**
     * Deletes a file given its URI.
     */
     deleteFile(fileUri: string): Promise<void>;
}

class LocalStorageService implements StorageService {
    constructor() {
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
    }

    async uploadFile(fileName: string, buffer: Buffer): Promise<string> {
        // Generate a safe unique filename to avoid overwrites
        const ext = path.extname(fileName);
        const safeName = `${nanoid()}${ext}`;
        const filePath = path.join(UPLOADS_DIR, safeName);
        
        await fs.promises.writeFile(filePath, buffer);
        
        // Return a local URI scheme we can use to easily identify local files
        return `local://${safeName}`;
    }

    async downloadFile(fileUri: string): Promise<Buffer> {
        if (!fileUri.startsWith('local://')) {
            throw new Error(`Unsupported URI schema: ${fileUri}`);
        }
        const fileName = fileUri.replace('local://', '');
        const filePath = path.join(UPLOADS_DIR, fileName);
        
        return await fs.promises.readFile(filePath);
    }
    
    async deleteFile(fileUri: string): Promise<void> {
        if (!fileUri.startsWith('local://')) {
            throw new Error(`Unsupported URI schema: ${fileUri}`);
        }
        const fileName = fileUri.replace('local://', '');
        const filePath = path.join(UPLOADS_DIR, fileName);
        
        if (fs.existsSync(filePath)) {
           await fs.promises.unlink(filePath);
        }
    }
}

// In production, you would conditionally export an S3StorageService here
export const storage: StorageService = new LocalStorageService();
