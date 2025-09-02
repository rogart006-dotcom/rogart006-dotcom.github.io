import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  return (
    <>
      <Head>
        <title>Contact - Animated Portfolio</title>
        <meta name="description" content="Contact form to reach me" />
      </Head>
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">Contact Me</h1>
          <ContactForm apiBaseUrl={apiBaseUrl} />
        </div>
      </Layout>
    </>
  );
}
