import React, { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token; // Check if token exists

    let roles = [];

    if (isAuthenticated) {
      try {
        // If the user is authenticated, decode the token to get user roles
        const decodedToken = jwt.verify(token, "merde");

        // Assuming roles are stored in the token payload
        roles = decodedToken.roles || [];
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    return {
      isAuthenticated,
      token: isAuthenticated ? token : null,
      roles,
    };
  });

  // Save the token to localStorage whenever it changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [auth.token]);

  // Logout function to clear authentication data
  const logout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Update the auth state to indicate non-authenticated state
    setAuth({
      isAuthenticated: false,
      token: null,
      roles: [],
    });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
