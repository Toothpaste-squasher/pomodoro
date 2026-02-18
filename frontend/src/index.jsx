import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Root components
import App from "./App";

// Contexts
import { AuthProvider } from "./contexts/auth/authProvider";
import { AppProvider } from "./contexts/AppProvider.jsx";

// Global style
import './index.scss'


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
