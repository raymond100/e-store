import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // Check if the user is authenticated and has the required roles
  if (auth && auth.token && Array.isArray(auth.roles)) {
    const isAuthorized = auth.roles.some((role) => allowedRoles.includes(role));

    if (isAuthorized) {
      return <Outlet />;
    }
  }

  // If auth is not defined or the user is not authenticated, redirect to the login page
  if (!auth || !auth.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is authenticated but not authorized, redirect to the unauthorized page
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default PrivateRoute;
