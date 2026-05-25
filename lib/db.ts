/**
 * Database layer
 * - Development: local SQLite file via better-sqlite3
 * - Production (Vercel): Turso cloud DB via @libsql/client
 *
 * All exported helpers are async-safe so they work in both Server Components
 * and Server Actions.
 */

import type { Client, InValue } from '@libsql/client';

// ─── Singleton ────────────────────────────────────────────────────────────────
let _client: Client | null = null;

function getClient(): Client {
  if (_client) return _client;

  const { createClient } = require('@libsql/client') as typeof import('@libsql/client');

  if (process.env.TURSO_DATABASE_URL) {
    // Production: Turso remote DB
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  } else {
    // Development: local SQLite file
    const path = require('path') as typeof import('path');
    const fs = require('fs') as typeof import('fs');
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    _client = createClient({ url: `file:${path.join(dataDir, 'rescue.db')}` });
  }

  return _client;
}

// ─── Query helpers ────────────────────────────────────────────────────────────
type Row = Record<string, unknown>;

export async function query<T = Row>(sql: string, args: InValue[] = []): Promise<T[]> {
  const result = await getClient().execute({ sql, args });
  return result.rows as unknown as T[];
}

export async function queryOne<T = Row>(sql: string, args: InValue[] = []): Promise<T | null> {
  const rows = await query<T>(sql, args);
  return rows[0] ?? null;
}

export async function execute(sql: string, args: InValue[] = []): Promise<void> {
  await getClient().execute({ sql, args });
}

export async function executeMany(statements: { sql: string; args?: InValue[] }[]): Promise<void> {
  await getClient().batch(statements.map(s => ({ sql: s.sql, args: s.args ?? [] })));
}

// ─── Schema init + seed ───────────────────────────────────────────────────────
let _initialized = false;

export async function initDb(): Promise<void> {
  if (_initialized) return;
  _initialized = true;

  const client = getClient();

  await client.executeMultiple(`
    CREATE TABLE IF NOT EXISTS dogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      age TEXT NOT NULL,
      gender TEXT NOT NULL,
      size TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Available',
      bio TEXT,
      image_url TEXT,
      good_with_kids INTEGER DEFAULT 1,
      good_with_dogs INTEGER DEFAULT 1,
      good_with_cats INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS adoption_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dog_id INTEGER,
      dog_name TEXT,
      applicant_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      reason TEXT,
      experience TEXT,
      home_type TEXT,
      other_pets TEXT,
      status TEXT DEFAULT 'Pending',
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS volunteer_signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      interests TEXT,
      availability TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed if empty
  const rows = await query<{ count: number }>('SELECT COUNT(*) as count FROM dogs');
  if (rows[0]?.count === 0) {
    const dogs = [
      ['Buddy', 'Golden Retriever', '3 years', 'Male', 'Large', 'Available', "Buddy is a gentle giant who loves nothing more than a good belly rub and afternoon walks. He's great with kids and would thrive in an active family.", 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop', 1, 1, 0],
      ['Luna', 'Border Collie Mix', '2 years', 'Female', 'Medium', 'Available', "Luna is an intelligent and energetic girl who loves to play fetch and learn new tricks. She needs space to run and mental stimulation.", 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=400&fit=crop', 1, 1, 1],
      ['Max', 'Labrador Retriever', '5 years', 'Male', 'Large', 'Available', "Max is a sweet and calm boy who loves cuddles on the couch. He's house-trained and well-behaved — perfect for a quieter home.", 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop', 1, 1, 0],
      ['Daisy', 'Beagle', '4 years', 'Female', 'Small', 'Pending', "Daisy is a curious and friendly beagle who loves exploring the outdoors. She follows her nose everywhere and needs a securely fenced yard.", 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop', 1, 1, 0],
      ['Charlie', 'Australian Shepherd', '1 year', 'Male', 'Medium', 'Available', "Charlie is a young and playful pup with boundless energy and a heart of gold. He's still learning but picks up training quickly!", 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop', 0, 1, 0],
      ['Bella', 'Chihuahua Mix', '7 years', 'Female', 'Small', 'Available', "Bella is a tiny but mighty girl with lots of love to give. She has a big personality and would do best as the only pet.", 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop', 0, 0, 0],
    ];
    for (const d of dogs) {
      await execute(
        `INSERT INTO dogs (name,breed,age,gender,size,status,bio,image_url,good_with_kids,good_with_dogs,good_with_cats) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        d as InValue[]
      );
    }
    const resources = [
      ['New Dog Owner Guide', 'Everything you need to know in your first week with your rescue dog.', 'Getting Started', 'https://www.humanesociety.org/resources/bringing-your-new-dog-home'],
      ['Understanding Dog Body Language', "Learn to read your dog's signals to build a stronger bond.", 'Training & Behavior', 'https://www.akc.org/expert-advice/training/dog-body-language/'],
      ['Positive Reinforcement Training', 'Force-free training methods that build trust and make learning fun.', 'Training & Behavior', 'https://www.aspca.org/pet-care/dog-care/dog-training'],
      ['Nutrition & Feeding Guide', 'How to choose the right food and feeding schedule for your dog.', 'Health & Care', 'https://www.akc.org/expert-advice/nutrition/how-to-choose-the-right-dog-food/'],
      ['Veterinary Care Checklist', 'Essential vet visits and preventive care for your newly adopted dog.', 'Health & Care', 'https://www.avma.org/resources-tools/pet-owners/petcare/routine-veterinary-care'],
      ['Dog-Proofing Your Home', 'Step-by-step guide to make your home safe for a new dog.', 'Getting Started', null],
    ];
    for (const r of resources) {
      await execute(
        `INSERT INTO resources (title, description, category, url) VALUES (?,?,?,?)`,
        r as InValue[]
      );
    }
  }
}

export default { query, queryOne, execute, initDb };
