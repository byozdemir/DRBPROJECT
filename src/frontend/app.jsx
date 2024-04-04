import React from "react";
import RouteList from "./routes.jsx";
import { ToastContainer, toast } from "react-toastify";

// minified version is also included
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <ToastContainer />
    </>
  );
}
