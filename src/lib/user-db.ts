import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/lib/user-db.json');

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    name?: string;
    createdAt: string;
}

export interface UserAssistant {
    id: string;
    userId: string;
    accessKey: string;
    name: string;
    domain: string;
    createdAt: string;
}

interface DB {
    users: User[];
    assistants: UserAssistant[];
}

function ensureDB() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], assistants: [] }, null, 2));
    }
}

export function getDB(): DB {
    ensureDB();
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
}

export function saveDB(db: DB) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

export function findUserByEmail(email: string): User | undefined {
    const db = getDB();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
    const db = getDB();
    return db.users.find(u => u.id === id);
}

export function addUser(user: User) {
    const db = getDB();
    db.users.push(user);
    saveDB(db);
}

export function getUserAssistants(userId: string): UserAssistant[] {
    const db = getDB();
    return db.assistants.filter(a => a.userId === userId);
}

export function addAssistant(assistant: UserAssistant) {
    const db = getDB();
    db.assistants.push(assistant);
    saveDB(db);
}

export function deleteAssistant(id: string, userId: string) {
    const db = getDB();
    db.assistants = db.assistants.filter(a => !(a.id === id && a.userId === userId));
    saveDB(db);
}
