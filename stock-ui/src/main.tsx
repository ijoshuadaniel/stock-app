import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>
);
