const rateLimit = require("express-rate-limit");

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10);
const max = parseInt(process.env.RATE_LIMIT_MAX || "100", 10);

module.exports = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests" });
  }
});
