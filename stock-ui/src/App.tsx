import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.scss";
import { ThemeContext } from "./context/themeContext";
import AppEntry from "./pages/entry";
import Login from "./pages/login";
import themes from "./utils/themes";

const App = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const selectedTheme = themes[theme];
    for (const key in selectedTheme) {
      const value = key as keyof typeof selectedTheme;
      document.documentElement.style.setProperty(
        `--${key}`,
        selectedTheme[value]
      );
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/stocks" element={<AppEntry />} />
    </Routes>
  );
};

export default App;
