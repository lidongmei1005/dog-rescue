import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'rescue.db');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
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
      address TEXT,
      reason TEXT,
      experience TEXT,
      home_type TEXT,
      has_yard INTEGER DEFAULT 0,
      other_pets TEXT,
      status TEXT DEFAULT 'Pending',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (dog_id) REFERENCES dogs(id)
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

  // Seed dogs if table is empty
  const dogCount = (db.prepare('SELECT COUNT(*) as count FROM dogs').get() as { count: number }).count;
  if (dogCount === 0) {
    const insertDog = db.prepare(`
      INSERT INTO dogs (name, breed, age, gender, size, status, bio, image_url, good_with_kids, good_with_dogs, good_with_cats)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const dogs = [
      ['Buddy', 'Golden Retriever', '3 years', 'Male', 'Large', 'Available', 'Buddy is a gentle giant who loves nothing more than a good belly rub and afternoon walks. He\'s great with kids and would thrive in an active family.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop', 1, 1, 0],
      ['Luna', 'Border Collie Mix', '2 years', 'Female', 'Medium', 'Available', 'Luna is an intelligent and energetic girl who loves to play fetch and learn new tricks. She needs a home with space to run and a family who will keep her mentally stimulated.', 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&h=400&fit=crop', 1, 1, 1],
      ['Max', 'Labrador Retriever', '5 years', 'Male', 'Large', 'Available', 'Max is a sweet and calm boy who loves cuddles on the couch. He\'s house-trained and well-behaved, making him the perfect companion for a quieter home.', 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop', 1, 1, 0],
      ['Daisy', 'Beagle', '4 years', 'Female', 'Small', 'Pending', 'Daisy is a curious and friendly beagle who loves exploring the outdoors. She follows her nose everywhere and will need a securely fenced yard.', 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600&h=400&fit=crop', 1, 1, 0],
      ['Charlie', 'Australian Shepherd', '1 year', 'Male', 'Medium', 'Available', 'Charlie is a young and playful pup with boundless energy and a heart of gold. He\'s still learning the ropes but picks up on training quickly!', 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop', 0, 1, 0],
      ['Bella', 'Chihuahua Mix', '7 years', 'Female', 'Small', 'Available', 'Bella is a tiny but mighty girl who has lots of love to give. Despite her small size, she has a big personality and would do best as the only pet in the home.', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop', 0, 0, 0],
    ];
    for (const dog of dogs) {
      insertDog.run(...dog);
    }

    // Seed resources
    const insertResource = db.prepare(`
      INSERT INTO resources (title, description, category, url) VALUES (?, ?, ?, ?)
    `);
    const resources = [
      ['New Dog Owner Guide', 'Everything you need to know in your first week with your rescue dog, from setting up a safe space to establishing routines.', 'Getting Started', 'https://www.humanesociety.org/resources/bringing-your-new-dog-home'],
      ['Understanding Dog Body Language', 'Learn to read your dog\'s signals so you can build a stronger bond and prevent misunderstandings.', 'Training & Behavior', 'https://www.akc.org/expert-advice/training/dog-body-language/'],
      ['Positive Reinforcement Training', 'A guide to force-free training methods that build trust and make learning fun for your dog.', 'Training & Behavior', 'https://www.aspca.org/pet-care/dog-care/dog-training'],
      ['Nutrition & Feeding Guide', 'How to choose the right food, portion sizes, and feeding schedules for dogs of all ages.', 'Health & Care', 'https://www.akc.org/expert-advice/nutrition/how-to-choose-the-right-dog-food/'],
      ['Veterinary Care Checklist', 'A checklist of essential vet visits, vaccinations, and preventive care for your newly adopted dog.', 'Health & Care', 'https://www.avma.org/resources-tools/pet-owners/petcare/routine-veterinary-care'],
      ['Dog-Proofing Your Home', 'Step-by-step instructions to make your home safe for a new dog, from securing hazardous items to creating cozy spaces.', 'Getting Started', null],
    ];
    for (const r of resources) {
      insertResource.run(...r);
    }
  }
}

export default getDb;
