import React from "react";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </AuthProvider>
  );
}
