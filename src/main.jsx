import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "./styles/global-styles";
import { AppProviders } from "./context/app/index.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  </StrictMode>
);
