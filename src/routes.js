import React from "react";
import { Routes as Rs, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Products from "./pages/components/Products";
import Create from "./pages/components/Create";
import Edit from "./pages/components/Edit";
import ProductDetail from "./pages/components/ProductDetail";
import PrivateRoute from "./pages/components/auth/PrivateRoute";
import Login from "./pages/components/auth/Login";
import Register from "./pages/components/auth/Register";

function Routes(params) {
  return (
    <Rs>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />

      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path="/:productSlug" element={<ProductDetail />} />
          <Route path="create" element={<Create />} />
          <Route path="edit" element={<Edit />} />
        </Route>
      </Route>
    </Rs>
  );
}

export default Routes;
