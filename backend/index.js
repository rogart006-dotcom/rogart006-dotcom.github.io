require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const messageRoutes = require("./src/routes/messages");
const { initDb } = require("./src/db/init");
const errorHandler = require("./src/middleware/errorHandler");
const logger = require("./src/middleware/logger");
const rateLimiter = require("./src/middleware/rateLimiter");

const app = express();

initDb();

app.use(helmet());
app.use(logger);
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(rateLimiter);
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

const port = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

module.exports = app;
