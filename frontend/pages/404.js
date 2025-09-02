import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-28 text-center">
        <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-6xl font-bold mb-4">
          404
        </motion.h1>
        <p className="mb-6 text-gray-600">Page not found.</p>
        <Link href="/">
          <a className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg">Go home</a>
        </Link>
      </div>
    </Layout>
  );
}
