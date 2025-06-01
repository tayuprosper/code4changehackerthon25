import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Routes/Router";
import "./index.css"; // or Tailwind styles etc.
import Course from "./components/Course";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Router />
      <Course />
    </>
  </React.StrictMode>
);
