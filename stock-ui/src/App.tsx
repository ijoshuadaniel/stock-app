import { useContext, useEffect, useState } from "react";
import { CiDark, CiLight, CiSearch } from "react-icons/ci";
import "./app.scss";
import BottomNavigation from "./component/bottomNavigation";
import { ThemeContext } from "./context/themeContext";
import Stocks from "./pages/stocks";
import themes from "./utils/themes";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
      const value = key as keyof typeof selectedTheme;
      document.documentElement.style.setProperty(
        `--${key}`,
        selectedTheme[value]
      );
    }
  }, [theme]);

  return (
    <div className="app" style={{ height: `${windowHeight}px` }}>
      <div className="app-header" style={{ height: `${headerHeight}px` }}>
        <h1>Stocks</h1>
        <div className="app-header-icon">
          <CiSearch />
          {theme === "dark" ? (
            <CiLight onClick={toggleTheme} />
          ) : (
            <CiDark onClick={toggleTheme} />
          )}
        </div>
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
