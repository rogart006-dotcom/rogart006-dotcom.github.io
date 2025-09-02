import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import MessageList from "../components/MessageList";
import LoginForm from "../components/LoginForm";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // no server redirect to keep static-export-safe
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>Dashboard - Animated Portfolio</title>
      </Head>
      <Layout>
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          {!isAuthenticated ? <LoginForm /> : <MessageList />}
        </div>
      </Layout>
    </>
  );
}
