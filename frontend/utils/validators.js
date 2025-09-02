import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be at most 100 characters"
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  subject: Joi.string().max(150).allow("").messages({
    "string.max": "Subject must be at most 150 characters"
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters",
    "string.max": "Message must be at most 2000 characters"
  })
});

export default function validateMessage(data) {
  const mapped = { name: data.name || "", email: data.email || "", subject: data.subject || "", message: data.message || data.body || "" };
  const { error } = schema.validate(mapped, { abortEarly: false });
  if (!error) return { valid: true, errors: {} };
  const errors = {};
  error.details.forEach((d) => {
    const key = d.path[0] === "message" ? "body" : d.path[0];
    errors[key] = d.message;
  });
  return { valid: false, errors };
}
