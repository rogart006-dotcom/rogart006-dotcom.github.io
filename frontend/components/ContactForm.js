import React, { useState } from "react";
import { motion } from "framer-motion";
import validateMessage from "../utils/validators";
import api from "../utils/api";

export default function ContactForm({ apiBaseUrl = "" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    const result = validateMessage({ name, email, subject, message });
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setStatus("pending");
    try {
      const res = await api.postJSON(`${apiBaseUrl}/api/messages`, {
        name,
        email,
        subject,
        body: message
      });
      if (res && res.id) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      if (err && err.errors) {
        setErrors(err.errors);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="grid gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Name</span>
          <input
            aria-invalid={!!errors.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 border rounded px-3 py-2"
            type="text"
            name="name"
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Email</span>
          <input
            aria-invalid={!!errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border rounded px-3 py-2"
            type="email"
            name="email"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Subject</span>
          <input
            aria-invalid={!!errors.subject}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 border rounded px-3 py-2"
            type="text"
            name="subject"
          />
          {errors.subject && <span className="text-red-600 text-sm">{errors.subject}</span>}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Message</span>
          <textarea
            aria-invalid={!!errors.body}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 border rounded px-3 py-2 min-h-[140px]"
            name="message"
          />
          {errors.body && <span className="text-red-600 text-sm">{errors.body}</span>}
        </label>

        <div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "pending"}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            {status === "pending" ? "Sending..." : "Send Message"}
          </motion.button>
          {status === "success" && <span className="ml-3 text-green-600">Message sent!</span>}
          {status === "error" && <span className="ml-3 text-red-600">Failed to send.</span>}
        </div>
      </div>
    </form>
  );
}
