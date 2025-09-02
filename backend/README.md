# Backend - Animated Portfolio API

Prerequisites:
- Node.js 18+
- npm

Setup:
1. copy env.example to .env and set variables (ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET)
2. npm ci
3. npm run migrate
4. npm run dev
   - Runs on http://localhost:4000

API Endpoints:
- POST /api/auth/login { username, password } -> 200 { token, expiresAt }
- POST /api/messages { name, email, subject, body } -> 201 { id, name, ... }
- GET /api/messages?limit=&offset= -> 200 { messages: [...], count }
- GET /api/messages/:id -> 200 { message }
- PUT /api/messages/:id { status | name | email | subject | body } -> 200 { message }
- DELETE /api/messages/:id -> 204

Notes:
- Uses SQLite (better-sqlite3). Persist database file (default: ./data/messages.db).
- For production, set FRONTEND_ORIGIN to restrict CORS.
- For Docker, use the provided Dockerfile and mount a volume for /app/data to persist DB.
