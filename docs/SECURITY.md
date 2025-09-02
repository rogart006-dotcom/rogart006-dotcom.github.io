Security recommendations

- Use a strong, randomly generated JWT_SECRET and rotate regularly.
- Do not commit secrets to the repository.
- Restrict FRONTEND_ORIGIN to your deployed frontend URL.
- Run the backend behind HTTPS and a reverse proxy.
- For production, consider using a managed database (Postgres) instead of SQLite.
- Restrict permissions on the data directory and backup the SQLite file.
- Set NODE_ENV=production in production.
- Monitor logs and set up alerts for suspicious activity.
