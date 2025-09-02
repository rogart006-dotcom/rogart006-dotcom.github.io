const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const migrationsDir = path.join(__dirname, "..", "migrations");
const dbFile = process.env.SQLITE_FILE || path.join(__dirname, "..", "data", "messages.db");

function ensureDataDir() {
  const dir = path.dirname(dbFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function run() {
  ensureDataDir();
  const db = new Database(dbFile);
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL
    );
  `);

  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
  for (const f of files) {
    const name = f;
    const applied = db.prepare("SELECT 1 FROM migrations WHERE name = ?").get(name);
    if (!applied) {
      const sql = fs.readFileSync(path.join(migrationsDir, f), "utf8");
      db.exec(sql);
      db.prepare("INSERT INTO migrations(name, applied_at) VALUES (?, datetime('now'))").run(name);
      console.log("Applied migration:", name);
    } else {
      console.log("Already applied:", name);
    }
  }
  db.close();
}

run();
