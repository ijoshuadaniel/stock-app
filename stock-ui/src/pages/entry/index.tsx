import { useContext, useEffect, useState } from "react";
import AutoComplete from "../../component/autoComplete";
import BottomNavigation from "../../component/bottomNavigation";
import Header from "../../component/header";
import Modal from "../../component/modal";
import { AppContext } from "../../context/AppContext";
import StockInfo from "../../pages/info";
import Stocks from "../../pages/stocks";
import { pages } from "../../utils/constants";
import "./index.scss";

function AppEntry() {
  const { showSearch, page } = useContext(AppContext);
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
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    setHeaderHeight((windowHeight * 8) / 100);
    setContentHeight((windowHeight * 82) / 100);
    setNavigationHeight((windowHeight * 10) / 100);
  }, [windowHeight]);

  if (showSearch) {
    return <Modal width="100vw" height="100vh" content={<AutoComplete />} />;
  }

  return (
    <div className="entry" style={{ height: `${windowHeight}px` }}>
      <div className="entry-header" style={{ height: `${headerHeight}px` }}>
        <Header />
      </div>
      <div className="entry-content" style={{ height: `${contentHeight}px` }}>
        {pages.stock === page && <Stocks />}
        {pages.stockInfo === page && <StockInfo />}
      </div>
      <div
        className="entry-navigation"
        style={{ height: `${navigationHeight}px` }}
      >
        <BottomNavigation />
      </div>
    </div>
  );
}

export default AppEntry;
