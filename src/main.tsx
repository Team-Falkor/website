import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./global.css";

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
