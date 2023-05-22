import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./Router";
import "./index.css";
import { ThemeProvider } from "./Component/Darkmode/ThemeUseContext";
import axios from "axios";
import { AuthProvider } from "./Component/Auth/AuthContext";

// axios.defaults.baseURL = "https://vietstackoverflow-production.up.railway.app";
// axios.defaults.baseURL = "http://localhost:8080";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter basename="/DoAnTotNghiep">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
