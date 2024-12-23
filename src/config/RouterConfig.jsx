import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../components/ProductDetail";
import ErrorPage from "../pages/ErrorPage";

function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-details/:id" element={<ProductDetail />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default RouterConfig;
