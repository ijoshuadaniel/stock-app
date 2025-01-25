import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./component/errorBoundry/index.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { ThemeProvider } from "./context/themeContext.tsx";
import "./main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);
