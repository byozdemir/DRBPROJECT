import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Welcome from "./pages/Welcome.jsx";
export default function RouteList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
