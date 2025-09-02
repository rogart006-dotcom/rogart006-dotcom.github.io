# Animated Portfolio (Monorepo)

This repository contains a Next.js frontend (static export friendly) and an Express + SQLite backend API for messages and a simple admin dashboard.

Prerequisites:
- Node.js 18+
- npm
- Git

Run locally:

1. Backend
   - cd backend
   - cp env.example .env
   - Set ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET in .env
   - npm ci
   - npm run migrate
   - npm run dev
   - Backend will run at http://localhost:4000

2. Frontend
   - cd frontend
   - cp env.example .env.local
   - Set NEXT_PUBLIC_API_URL=http://localhost:4000
   - npm ci
   - npm run dev
   - Frontend will run at http://localhost:3000

Build frontend for GitHub Pages:
- cd frontend
- npm run build
- The exported site will be in frontend/out
- You can deploy this folder to GitHub Pages (gh-pages branch) or use the included GitHub Actions workflow.

Environment variables:
- frontend: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_ASSET_PREFIX
- backend: see backend/env.example

API:
- POST /api/auth/login { username, password } -> { token, expiresAt }
- POST /api/messages { name, email, subject, body } -> creates message
- GET /api/messages -> list (requires Authorization: Bearer <token>)
- GET /api/messages/:id -> get message (requires auth)
- PUT /api/messages/:id -> update (requires auth)
- DELETE /api/messages/:id -> delete (requires auth)

Troubleshooting:
- CORS issues: set FRONTEND_ORIGIN in backend .env
- Token expired: re-login via dashboard
- DB permission: ensure ./backend/data is writable

Deploy:
- Frontend: GitHub Pages (set NEXT_PUBLIC_ASSET_PREFIX to /repo-name if using project pages), Vercel recommended for dynamic builds.
- Backend: Deploy to Render/Railway/DigitalOcean, ensure persistent storage for SQLite or migrate to Postgres for production.
