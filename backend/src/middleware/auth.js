const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "change_this_secret";
    const payload = jwt.verify(token, secret);
    req.user = { username: payload.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
