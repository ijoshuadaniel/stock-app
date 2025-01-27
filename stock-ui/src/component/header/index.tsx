import { useContext } from "react";
import { CiDark, CiLight, CiSearch } from "react-icons/ci";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/themeContext";

import { MdKeyboardBackspace } from "react-icons/md";
import { pages } from "../../utils/constants";
import "./index.scss";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toggleSearch, pageInfo, setPageInfo, changePage } =
    useContext(AppContext);

  const handleGoBack = () => {
    setPageInfo({
      stock: "",
      headers: {
        name: "Stocks",
        showBackBtn: false,
        pageToGo: pages.stock,
      },
    });
    changePage(pageInfo.headers.pageToGo);
  };

  return (
    <div className="header">
      <div className="header-left">
        {pageInfo.headers.showBackBtn && (
          <MdKeyboardBackspace onClick={handleGoBack} />
        )}
        <h1>{pageInfo.headers.name}</h1>
      </div>
      <div className="header-icon">
        <CiSearch onClick={() => toggleSearch()} />
        {theme === "dark" ? (
          <CiLight onClick={toggleTheme} />
        ) : (
          <CiDark onClick={toggleTheme} />
        )}
      </div>
    </div>
  );
};

export default Header;
