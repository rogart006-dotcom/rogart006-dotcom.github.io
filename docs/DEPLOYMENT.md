Deployment guide

Frontend (GitHub Pages):
- Set NEXT_PUBLIC_ASSET_PREFIX to "/repo-name" if using project page.
- Use provided GitHub Actions workflow or run `npm run deploy:ghpages` from frontend.

Backend:
- Render/Railway: create a Node service, set environment variables, mount persistent disk for SQLite or use Postgres.
- Docker: build with provided Dockerfile and mount ./data to container /app/data.

Notes:
- Ensure CORS FRONTEND_ORIGIN in backend matches deployed frontend origin.
- Health check endpoint: /health
