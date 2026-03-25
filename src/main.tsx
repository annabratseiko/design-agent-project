import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "./theme";
import { App } from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <FluentProvider theme={lightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>
);
