/*
 *
 * Index: `App`.
 *
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppGlobalStyles from "@exsys-patient-insurance/app-global-styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// CHIS
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <AppGlobalStyles />
    <App />
  </StrictMode>
);

reportWebVitals();
