# Frontend - Animated Portfolio

Prerequisites:
- Node.js 18+
- npm

Setup:
1. copy env.example to .env.local and set NEXT_PUBLIC_API_URL (e.g., http://localhost:4000)
2. cd frontend
3. npm ci
4. npm run dev
   - Runs on http://localhost:3000

Build & Export (static export for GitHub Pages):
1. npm run build
2. The exported static site will be in the `frontend/out` folder
3. To serve locally: npx serve out

Deploy to GitHub Pages:
- Option A: Use `npm run deploy:ghpages` (ensure repository field and homepage set)
- Option B: Use provided GitHub Actions workflow which builds `frontend/out` and publishes to `gh-pages` branch.
  - If deploying to a project page, set NEXT_PUBLIC_ASSET_PREFIX to `/repo-name`.

Notes:
- Ensure backend sets CORS to allow frontend origin (or leave open for local testing).
- NEXT_PUBLIC_API_URL must point to your backend (for local development http://localhost:4000).
