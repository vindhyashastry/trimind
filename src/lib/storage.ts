import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'uploads';

// Determine storage directory for local fallback
const UPLOADS_DIR = path.join(process.cwd(), '.data', 'uploads');

export interface StorageService {
    uploadFile(fileName: string, buffer: Buffer): Promise<string>;
    downloadFile(fileUri: string): Promise<Buffer>;
    deleteFile(fileUri: string): Promise<void>;
}

class SupabaseStorageService implements StorageService {
    private supabase;

    constructor() {
        this.supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!);
    }

    async uploadFile(fileName: string, buffer: Buffer): Promise<string> {
        const ext = path.extname(fileName);
        const safeName = `${nanoid()}${ext}`;

        const { error } = await this.supabase.storage
            .from(BUCKET)
            .upload(safeName, buffer, { upsert: false });

        if (error) throw new Error(`Supabase upload error: ${error.message}`);
        return `supabase://${safeName}`;
    }

    async downloadFile(fileUri: string): Promise<Buffer> {
        if (!fileUri.startsWith('supabase://')) {
            throw new Error(`Unsupported URI schema: ${fileUri}`);
        }
        const fileName = fileUri.replace('supabase://', '');
        const { data, error } = await this.supabase.storage
            .from(BUCKET)
            .download(fileName);

        if (error || !data) throw new Error(`Supabase download error: ${error?.message}`);
        return Buffer.from(await data.arrayBuffer());
    }

    async deleteFile(fileUri: string): Promise<void> {
        if (!fileUri.startsWith('supabase://')) {
            throw new Error(`Unsupported URI schema: ${fileUri}`);
        }
        const fileName = fileUri.replace('supabase://', '');
        const { error } = await this.supabase.storage
            .from(BUCKET)
            .remove([fileName]);

        if (error) console.error(`Supabase delete error: ${error.message}`);
    }
}

class LocalStorageService implements StorageService {
    constructor() {
        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
    }

    async uploadFile(fileName: string, buffer: Buffer): Promise<string> {
        const ext = path.extname(fileName);
        const safeName = `${nanoid()}${ext}`;
        const filePath = path.join(UPLOADS_DIR, safeName);
        await fs.promises.writeFile(filePath, buffer);
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

// Use Supabase Storage in production (when env vars are set), local fallback for dev
export const storage: StorageService =
    SUPABASE_URL && SUPABASE_SERVICE_KEY
        ? new SupabaseStorageService()
        : new LocalStorageService();
