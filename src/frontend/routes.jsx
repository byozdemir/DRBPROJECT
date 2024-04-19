import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Welcome from "./pages/Welcome.jsx";
import AuthContainer from "./containers/AuthContainer.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Builder from "./pages/Builder/Builder.tsx";
export default function RouteList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/builder/" element={<Builder/>}/>
        <Route path="/authentication/login" element={<Login />} />
        <Route path="/authentication/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
