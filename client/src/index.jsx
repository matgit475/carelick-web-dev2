import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/modules/auth/AuthProvider";
import { VerificationProvider } from "../src/modules/verifications/VerificationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./app/App";
import "./app/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <VerificationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </VerificationProvider>
  </BrowserRouter>,
);
