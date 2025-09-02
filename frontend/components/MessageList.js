import React, { useEffect, useState } from "react";
import api from "../utils/api";
import MessageCard from "./MessageCard";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function MessageList() {
  const { token } = useAuth();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMessages() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await api.authFetch(`${apiBaseUrl}/api/messages`, { method: "GET" }, token);
      const json = await data.json();
      setMessages(json.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function updateStatus(id, status) {
    try {
      const res = await api.authFetch(`${apiBaseUrl}/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }, token);
      const json = await res.json();
      setMessages((m) => m.map((msg) => (msg.id === id ? json.message : msg)));
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteMessage(id) {
    if (!confirm("Delete this message?")) return;
    try {
      await api.authFetch(`${apiBaseUrl}/api/messages/${id}`, { method: "DELETE" }, token);
      setMessages((m) => m.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  function viewMessage(id) {
    // Simple local view: mark as read
    updateStatus(id, "read");
    alert("Open message in reader (not implemented): " + id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Messages</h2>
        <button onClick={fetchMessages} className="text-sm bg-gray-100 px-3 py-1 rounded">Refresh</button>
      </div>
      {loading && <div>Loading...</div>}
      <div className="space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div key={msg.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <MessageCard
                message={msg}
                onUpdateStatus={updateStatus}
                onDelete={deleteMessage}
                onView={viewMessage}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {!loading && messages.length === 0 && <div className="text-gray-600">No messages yet.</div>}
      </div>
    </div>
  );
}
