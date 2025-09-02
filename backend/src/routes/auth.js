const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mapped = {};
      errors.array().forEach((e) => (mapped[e.param] = e.msg));
      return res.status(400).json({ errors: mapped });
    }
    const { username, password } = req.body;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const secret = process.env.JWT_SECRET || "change_this_secret";
      const expiresIn = process.env.JWT_EXPIRY || "2h";
      const token = jwt.sign({ sub: ADMIN_USERNAME }, secret, { expiresIn });
      const decoded = jwt.decode(token);
      const expiresAt = decoded && decoded.exp ? new Date(decoded.exp * 1000).toISOString() : null;
      return res.json({ token, expiresAt });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  }
);

module.exports = router;
