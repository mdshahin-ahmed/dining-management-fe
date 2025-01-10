import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import App from "./App.jsx";
import { AppProviders } from "./context/app/index.jsx";
import "./index.css";
import "./styles/global-styles";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  </StrictMode>
);
