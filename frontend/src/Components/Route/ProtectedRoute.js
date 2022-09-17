import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (loading === false && isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return loading === false && children;
};

export default ProtectedRoute;
