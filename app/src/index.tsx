/*
 *
 * Index: `App`.
 *
 */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import AppGlobalStyles from "@exsys-clinio/app-global-styles";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

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
