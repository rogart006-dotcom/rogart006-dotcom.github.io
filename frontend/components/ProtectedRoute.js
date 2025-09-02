import React from "react";
import { useAuth } from "../context/AuthContext";

export function withAuth(Component) {
  return function AuthenticatedWrapper(props) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
      return <div>Please login to continue.</div>;
    }
    return <Component {...props} />;
  };
}
