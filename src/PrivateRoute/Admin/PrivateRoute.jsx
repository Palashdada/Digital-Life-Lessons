import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};

export default PrivateRoute;
