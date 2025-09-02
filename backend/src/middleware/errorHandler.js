module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  if (err && err.status) {
    const status = err.status;
    const copy = { ...err };
    delete copy.status;
    return res.status(status).json(copy);
  }
  if (err && err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" ? undefined : err.message
  });
};
