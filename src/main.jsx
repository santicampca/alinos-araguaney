import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { UpsellProvider } from "./context/UpsellContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <UpsellProvider>
            <App />
          </UpsellProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);