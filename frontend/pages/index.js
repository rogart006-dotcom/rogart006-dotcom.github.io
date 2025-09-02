import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Animated Portfolio</title>
        <meta name="description" content="A modern animated portfolio built with Next.js and Node.js" />
        <meta property="og:title" content="Animated Portfolio" />
        <meta property="og:description" content="A modern animated portfolio built with Next.js and Node.js" />
      </Head>
      <Layout>
        <motion.section
          className="container mx-auto px-6 py-20 text-center"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={heroVariants}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80&auto=format&fit=crop"
            alt="logo"
            className="w-32 h-32 mx-auto rounded-full shadow-lg mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Hello, I'm Your Name.</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            I build beautiful, performant web experiences using modern technologies.
          </p>
          <Link href="/contact">
            <a className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Get in touch
            </a>
          </Link>
        </motion.section>

        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Selected Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=800&q=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop"
              ].map((src, i) => (
                <motion.a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.03 }}
                >
                  <img src={src} alt={`portfolio-${i}`} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">Project {i + 1}</h3>
                    <p className="text-sm text-gray-600">A short description of the project.</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
