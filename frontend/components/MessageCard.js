import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

function timeAgo(iso) {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  } catch (e) {
    return iso;
  }
}

export default function MessageCard({ message, onUpdateStatus, onDelete, onView }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{message.subject}</h3>
          <p className="text-sm text-gray-600">{message.name} • {message.email} • {timeAgo(message.created_at)}</p>
          <p className="mt-2 text-gray-800">{message.body.slice(0, 200)}{message.body.length > 200 ? "…" : ""}</p>
        </div>
        <div className="ml-4 flex flex-col items-end space-y-2">
          <span className={`text-xs px-2 py-1 rounded ${message.status === "unread" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
            {message.status}
          </span>
          <button onClick={() => onView(message.id)} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">View</button>
          <div className="flex space-x-2">
            <button onClick={() => onUpdateStatus(message.id, "read")} className="text-sm px-2 py-1 border rounded">Mark read</button>
            <button onClick={() => onUpdateStatus(message.id, "archived")} className="text-sm px-2 py-1 border rounded">Archive</button>
            <button onClick={() => onDelete(message.id)} className="text-sm px-2 py-1 border rounded text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
    status: PropTypes.oneOf(["unread", "read", "archived"]),
    created_at: PropTypes.string
  }).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};
