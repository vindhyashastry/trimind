import { describe, it, expect, vi } from 'vitest';
import { chunkText } from '../src/lib/file-parser';

describe('file-parser logic', () => {
    it('should chunk text correctly', () => {
        const text = 'a'.repeat(2500);
        const chunks = chunkText(text, 1000, 200);
        expect(chunks.length).toBe(3);
        expect(chunks[0].length).toBe(1000);
        expect(chunks[1].length).toBe(1000);
    });

    it('should handle small text without chunking', () => {
        const text = 'small text';
        const chunks = chunkText(text, 1000, 200);
        expect(chunks.length).toBe(1);
        expect(chunks[0]).toBe('small text');
    });
});
