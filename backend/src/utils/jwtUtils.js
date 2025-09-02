const jwt = require("jsonwebtoken");

function signToken(payload) {
  const secret = process.env.JWT_SECRET || "change_this_secret";
  const expiresIn = process.env.JWT_EXPIRY || "2h";
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET || "change_this_secret";
  return jwt.verify(token, secret);
}

module.exports = { signToken, verifyToken };
