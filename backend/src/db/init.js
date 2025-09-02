const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

let db = null;

function ensureDataDir(dbPath) {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function runMigration(dbInstance, name, sql) {
  const applied = dbInstance.prepare("SELECT 1 FROM migrations WHERE name = ?").get(name);
  if (!applied) {
    dbInstance.exec(sql);
    dbInstance.prepare("INSERT INTO migrations(name, applied_at) VALUES (?, datetime('now'))").run(name);
    console.log("Applied migration:", name);
  } else {
    // console.log("Migration already applied:", name);
  }
}

function initDb() {
  const file = process.env.SQLITE_FILE || path.join(__dirname, "..", "..", "data", "messages.db");
  ensureDataDir(file);
  db = new Database(file);
  // ensure migrations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL
    );
  `);

  // Create messages table if not exists (idempotent)
  const createMessages = `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread' CHECK(status IN ('unread','read','archived')),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `;
  runMigration(db, "001_create_messages", createMessages);
  console.log("Database initialized at", file);
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return db;
}

module.exports = { initDb, getDb };
