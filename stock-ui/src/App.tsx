import { useEffect, useState } from "react";
import "./app.scss";
import BottomNavigation from "./component";
import Stocks from "./pages/stocks";
import themes from "./utils/themes";

function App() {
  const [theme, setTheme] = useState("dark");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navigationHeight, setNavigationHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setHeaderHeight((windowHeight * 8) / 100);
    setContentHeight((windowHeight * 84) / 100);
    setNavigationHeight((windowHeight * 10) / 100);
  }, [windowHeight]);

  useEffect(() => {
    const selectedTheme = themes[theme];
    for (const key in selectedTheme) {
      document.documentElement.style.setProperty(
        `--${key}`,
        selectedTheme[key]
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app" style={{ height: `${windowHeight}px` }}>
      <div className="app-header" style={{ height: `${headerHeight}px` }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="app-content" style={{ height: `${contentHeight}px` }}>
        <Stocks />
      </div>
      <div
        className="app-navigation"
        style={{ height: `${navigationHeight}px` }}
      >
        <BottomNavigation />
      </div>
    </div>
  );
}

export default App;
