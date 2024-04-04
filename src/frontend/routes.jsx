import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage.jsx";
import Welcome from "./pages/Welcome.jsx";
import AuthContainer from "./containers/AuthContainer.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/auth/Login.jsx";
export default function RouteList() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthContainer />}>
          <Route element={<About />} path="/about" exact />
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="/authentication/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
