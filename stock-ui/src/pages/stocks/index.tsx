import { rupees } from "../../utils/constants";
import jsonData from "./data.json";
import "./index.scss";

const Stocks = () => {
  const optionsSymbol = ["NIFTY 50", "NIFTY BANK", "NIFTY AUTO", "NIFTY IT"];

  const getName = (symbol: string) => {
    const name = jsonData.allstock.find((stock) => stock.symbol == symbol);
    if (name) {
      if (name.underlying.length > 15) {
        return name.underlying.slice(0, 15) + "...";
      } else {
        return name.underlying;
      }
    } else {
      return symbol;
    }
  };

  const getImage = async (symbol: string) => {
    const url = ``;
    const res = await fetch(url);
    const result = await res.blob();
    if (result.size > 0) {
      return url;
    } else {
      return "";
    }
  };

  return (
    <div className="stock">
      <div className="stock-balance">
        <p>Total Balance</p>
        <h3>{rupees} 0.000</h3>
      </div>
      <div className="stock-market">
        {optionsSymbol.map((option, i) => {
          const options = jsonData.market[option];
          const isPositive = options.change >= 0;
          return (
            <div
              className={`stock-market_container ${
                isPositive
                  ? "stock-market_container-borderPositive"
                  : "stock-market_container-borderNegative"
              }`}
              key={i}
            >
              <div className="stock-market_container_current">
                <h3>{options.identifier}</h3>
                <div className="stock-market_container_current-price">
                  <span>
                    {rupees}
                    {options.lastPrice}
                  </span>
                  <span
                    className={
                      isPositive
                        ? "stock-market_container_positive"
                        : "stock-market_container_negative"
                    }
                  >
                    {`(${isPositive ? "+" : ""}${options.change.toFixed(2)})`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="stock-mostbought">
        <h2>Most Brought on Stocks</h2>
        <div className="stock-mostbought_wrapper">
          {jsonData.active.slice(0, 4).map((activeStock, i) => {
            const isPositive = activeStock.change >= 0;
            const placeholder = activeStock.symbol.charAt(0).toUpperCase(); // Get the first letter

            return (
              <div
                className="stock-mostbought_container"
                key={activeStock.symbol}
              >
                <img
                  src={`https://s3tv-symbol.dhan.co/symbols/${activeStock.symbol}.svg`}
                  alt="stock image"
                  onError={(e) => {
                    e.target.style.display = "none"; // Hide image if it fails to load
                    e.target.nextSibling.style.display = "flex"; // Show placeholder
                  }}
                />
                <div className="stock-image-placeholder">{placeholder}</div>

                <h1>{getName(activeStock.symbol)}</h1>
                <p>
                  <span>
                    {rupees}
                    {activeStock.lastPrice}
                  </span>
                  <span
                    className={
                      isPositive
                        ? "stock-mostbought_container_positive"
                        : "stock-mostbought_container_negative"
                    }
                  >
                    {`(${isPositive ? "+" : ""}${activeStock.change.toFixed(
                      2
                    )})`}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stocks;
