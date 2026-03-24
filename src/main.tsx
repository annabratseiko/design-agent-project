import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "./theme";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={lightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>
);
