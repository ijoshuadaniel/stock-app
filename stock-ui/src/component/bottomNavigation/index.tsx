import { IoSettings, IoStatsChart } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";

import { LuFileChartLine } from "react-icons/lu";

import "./index.scss";

const BottomNavigation = () => {
  return (
    <div className="bottomNavigation">
      <div className="bottomNavigation-icon bottomNavigation-selected ">
        <IoStatsChart />
        <p>Stock</p>
      </div>
      <div className="bottomNavigation-icon">
        <SiMoneygram />
        <p>Portfolio</p>
      </div>
      <div className="bottomNavigation-icon">
        <LuFileChartLine />
        <p>Watchlist</p>
      </div>
      <div className="bottomNavigation-icon">
        <IoSettings />
        <p>Settings</p>
      </div>
    </div>
  );
};

export default BottomNavigation;
