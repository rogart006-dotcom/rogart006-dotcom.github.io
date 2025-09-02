import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    return decoded;
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("portfolio_admin_token") : null;
    if (stored) {
      const payload = decodeToken(stored);
      if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
        setToken(stored);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("portfolio_admin_token");
      }
    }
  }, []);

  function login(newToken) {
    setToken(newToken);
    setIsAuthenticated(true);
    try {
      localStorage.setItem("portfolio_admin_token", newToken);
    } catch (e) {
      // ignore
    }
  }

  function logout() {
    setToken(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("portfolio_admin_token");
    } catch (e) {}
  }

  async function authFetch(url, options = {}, overrideToken) {
    const t = overrideToken || token;
    const hdrs = options.headers ? { ...options.headers } : {};
    if (t) hdrs.Authorization = `Bearer ${t}`;
    const res = await fetch(url, { ...options, headers: hdrs });
    if (res.status === 401) {
      logout();
      throw { status: 401, error: "Unauthorized" };
    }
    return res;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
