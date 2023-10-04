import React from "react";
import NavigationBar from "./components/NavigationBar"; // Your top navigation bar component
import Sidebar from "./components/Sidebar"; // Your sidebar component
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom"; // Use React Router's Outlet

const Layout = () => {
  return (
    <Container fluid style={{ minHeight: "100vh", position: "relative" }}>
      <NavigationBar
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      />
      <Row>
        <Col
          sm={3}
          className="d-flex flex-column"
          style={{
            minHeight: "100vh",
            marginTop: "10px",
            borderRight: "2px solid #f8f9fa",
          }}
        >
          <Sidebar />
        </Col>
        <Col sm={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
