import React from "react";
import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import CategoriesList from "./CategoriesList";

import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Nav className="flex-column">
      <CategoriesList />
      <Button variant="danger" as={Link} onClick={handleLogout}>
        Logout
      </Button>
    </Nav>
  );
};

export default Sidebar;
