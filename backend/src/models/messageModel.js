const { getDb } = require("../db/init");

function createMessage({ name, email, subject, body }) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO messages (name, email, subject, body) VALUES (?, ?, ?, ?)`
  );
  const info = stmt.run(name, email, subject, body);
  const row = db.prepare("SELECT * FROM messages WHERE id = ?").get(info.lastInsertRowid);
  return row;
}

function getAllMessages({ limit = 100, offset = 0 } = {}) {
  const db = getDb();
  const stmt = db.prepare("SELECT * FROM messages ORDER BY datetime(created_at) DESC LIMIT ? OFFSET ?");
  const rows = stmt.all(limit, offset);
  const count = db.prepare("SELECT COUNT(*) as cnt FROM messages").get().cnt;
  return { messages: rows, count };
}

function getMessageById(id) {
  const db = getDb();
  return db.prepare("SELECT * FROM messages WHERE id = ?").get(id) || null;
}

function updateMessage(id, fields = {}) {
  const db = getDb();
  const allowed = ["name", "email", "subject", "body", "status"];
  const keys = Object.keys(fields).filter((k) => allowed.includes(k));
  if (keys.length === 0) return getMessageById(id);
  const sets = keys.map((k) => `${k} = ?`).join(", ");
  const stmt = db.prepare(`UPDATE messages SET ${sets} WHERE id = ?`);
  const params = keys.map((k) => fields[k]);
  params.push(id);
  stmt.run(...params);
  return getMessageById(id);
}

function deleteMessage(id) {
  const db = getDb();
  const stmt = db.prepare("DELETE FROM messages WHERE id = ?");
  const info = stmt.run(id);
  return info.changes > 0;
}

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};
