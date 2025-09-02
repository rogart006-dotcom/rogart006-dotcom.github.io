import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main role="main" className="flex-1">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Name. Built with Next.js.
      </footer>
    </div>
  );
}
