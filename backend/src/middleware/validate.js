const { validationResult } = require("express-validator");

module.exports = function runValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mapped = {};
    errors.array().forEach((e) => {
      mapped[e.param] = e.msg;
    });
    return res.status(400).json({ errors: mapped });
  }
  next();
};
