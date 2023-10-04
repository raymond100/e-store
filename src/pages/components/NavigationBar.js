import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        E-Commerce Store
      </Navbar.Brand>{" "}
      {/* Replace '/' with your home route */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="d-flex justify-content-between"
      >
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>{" "}
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="text"
            placeholder="Search"
            className="mx-2 w-100"
          />
          <Button variant="outline-primary">Search</Button>
        </Form>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>{" "}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
