import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold">Animated Portfolio</span>
          </a>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <a className="text-sm">Home</a>
          </Link>
          <Link href="/contact">
            <a className="text-sm">Contact</a>
          </Link>
          <Link href="/dashboard">
            <a className="text-sm">Dashboard</a>
          </Link>
          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className="ml-2 bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
