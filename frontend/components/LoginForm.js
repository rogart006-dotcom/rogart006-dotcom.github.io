import React, { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    try {
      const res = await api.postJSON(`/api/auth/login`, { username, password });
      if (res && res.token) {
        login(res.token);
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err && err.error ? err.error : "Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="grid gap-4">
        <label className="flex flex-col">
          <span className="font-medium">Username</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 border rounded px-3 py-2" />
        </label>
        <label className="flex flex-col">
          <span className="font-medium">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 border rounded px-3 py-2" />
        </label>
        {error && <div className="text-red-600">{error}</div>}
        <motion.button whileTap={{ scale: 0.98 }} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Login
        </motion.button>
      </div>
    </form>
  );
}
