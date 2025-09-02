const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const { createMessage, getAllMessages, getMessageById, updateMessage, deleteMessage } = require("../models/messageModel");
const runValidation = require("../middleware/validate");

const router = express.Router();

// Public: create message
router.post(
  "/",
  body("name").isString().isLength({ min: 2, max: 100 }),
  body("email").isEmail(),
  body("subject").isString().isLength({ max: 150 }),
  body("body").isString().isLength({ min: 10, max: 2000 }),
  runValidation,
  (req, res, next) => {
    try {
      const { name, email, subject, body } = req.body;
      const message = createMessage({ name, email, subject, body });
      res.status(201).json(message);
    } catch (err) {
      next(err);
    }
  }
);

// Protected: list messages
router.get(
  "/",
  auth,
  query("limit").optional().isInt({ min: 1, max: 1000 }).toInt(),
  query("offset").optional().isInt({ min: 0 }).toInt(),
  runValidation,
  (req, res, next) => {
    try {
      const limit = req.query.limit || 100;
      const offset = req.query.offset || 0;
      const data = getAllMessages({ limit, offset });
      res.json({ messages: data.messages, count: data.count });
    } catch (err) {
      next(err);
    }
  }
);

// Protected: get by id
router.get(
  "/:id",
  auth,
  param("id").isInt().toInt(),
  runValidation,
  (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const msg = getMessageById(id);
      if (!msg) return res.status(404).json({ error: "Not found" });
      res.json({ message: msg });
    } catch (err) {
      next(err);
    }
  }
);

// Protected: update
router.put(
  "/:id",
  auth,
  param("id").isInt().toInt(),
  body("name").optional().isLength({ min: 2, max: 100 }),
  body("email").optional().isEmail(),
  body("subject").optional().isLength({ max: 150 }),
  body("body").optional().isLength({ min: 10, max: 2000 }),
  body("status").optional().isIn(["unread", "read", "archived"]),
  runValidation,
  (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const fields = {};
      ["name", "email", "subject", "body", "status"].forEach((k) => {
        if (req.body[k] !== undefined) fields[k] = req.body[k];
      });
      const updated = updateMessage(id, fields);
      if (!updated) return res.status(404).json({ error: "Not found" });
      res.json({ message: updated });
    } catch (err) {
      next(err);
    }
  }
);

// Protected: delete
router.delete(
  "/:id",
  auth,
  param("id").isInt().toInt(),
  runValidation,
  (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const ok = deleteMessage(id);
      if (!ok) return res.status(404).json({ error: "Not found" });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
