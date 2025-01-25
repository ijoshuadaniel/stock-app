import { useContext, useEffect, useState } from "react";
import { ShimmerText } from "shimmer-effects-react";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/themeContext";
import request from "../../utils/axios";
import { pages, rupees } from "../../utils/constants";
import "./index.scss";

type Stock = {
  symbol: string;
  underlying: string;
  lastPrice: number;
  change: number;
  perChange: number;
  ltp: number;
  pChange: number;
};

type JsonData = {
  allstock: Stock[];
  market: Record<
    string,
    { identifier: string; lastPrice: number; change: number }
  >;
  active: Stock[];
  gainers: Stock[];
  loosers: Stock[];
};

const Stocks: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { toggleSearch, changePage, setPageInfo } = useContext(AppContext);
  const optionsSymbol = ["NIFTY 50", "NIFTY BANK", "NIFTY AUTO", "NIFTY IT"];
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getName = (symbol: string, stocks: Stock[] = []) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    return stock
      ? stock.underlying.length > 15
        ? `${stock.underlying.slice(0, 15)}...`
        : stock.underlying
      : symbol;
  };

  const getData = async () => {
    try {
      const response = await request.get("/nse/stocks");
      setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getArrayData = (key: string) => {
    return jsonData
      ? (jsonData[key as keyof JsonData] as Stock[]).slice(0, 4)
      : [];
  };

  const handleStockInfo = (value: string) => {
    setPageInfo({ stock: value });
    changePage(pages.stockInfo);
  };

  if (loading) {
    return (
      <div className="stock">
        <div className="stock-balance">
          <p>Total Balance</p>
          <ShimmerText mode={theme} line={1} width={20} />
        </div>
        <div className="stock-market">
          {optionsSymbol.map((option, index) => (
            <div className="stock-market_container" key={index}>
              <ShimmerText mode={theme} line={2} width={50} />
            </div>
          ))}
        </div>
        {["active", "gainers", "loosers"].map((key) => (
          <div className="stock-mostbought" key={key}>
            <h2>
              <ShimmerText mode={theme} line={1} width={30} />
            </h2>
            <div className="stock-mostbought_wrapper">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <div className="stock-mostbought_container" key={index}>
                    <ShimmerText mode={theme} line={3} width={50} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stock">
      <div className="stock-balance">
        <p>Total Balance</p>
        <h3>{rupees} 0.000</h3>
      </div>
      <div className="stock-market">
        {optionsSymbol.map((option) => {
          const marketData = jsonData?.market[option];
          if (!marketData) return null;
          const isPositive = marketData.change >= 0;
          return (
            <div
              className={`stock-market_container ${
                isPositive
                  ? "stock-market_container-borderPositive"
                  : "stock-market_container-borderNegative"
              }`}
              key={option}
            >
              <div className="stock-market_container_current">
                <h3>{marketData.identifier}</h3>
                <div className="stock-market_container_current-price">
                  <span>
                    {rupees}
                    {marketData.lastPrice}
                  </span>
                  <span
                    className={
                      isPositive
                        ? "stock-market_container_positive"
                        : "stock-market_container_negative"
                    }
                  >
                    ({isPositive ? "+" : ""}
                    {marketData.change.toFixed(2)})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {["active", "gainers", "loosers"].map((key) => (
        <div className="stock-mostbought" key={key}>
          <h2>
            {key === "active"
              ? "Most Bought Stocks"
              : key === "gainers"
              ? "Top Gainers"
              : "Top Losers"}
          </h2>
          <div className="stock-mostbought_wrapper">
            {getArrayData(key).map((stock: Stock) => {
              stock.ltp = stock.ltp ? stock.ltp : stock.lastPrice;
              stock.perChange = stock.perChange
                ? stock.perChange
                : stock.pChange;
              const isPositive = stock.perChange >= 0;
              const placeholder = stock.symbol.charAt(0).toUpperCase();
              return (
                <div
                  className="stock-mostbought_container"
                  key={stock.symbol}
                  onClick={() => handleStockInfo(stock.symbol)}
                >
                  <img
                    src={`https://s3tv-symbol.dhan.co/symbols/${stock.symbol}.svg`}
                    alt="stock image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.add("show");
                    }}
                  />
                  <div className="stock-image-placeholder">{placeholder}</div>
                  <h1>{getName(stock.symbol, jsonData?.allstock)}</h1>
                  <p>
                    <span>
                      {rupees}
                      {stock.ltp}
                    </span>
                    <span
                      className={
                        isPositive
                          ? "stock-mostbought_container_positive"
                          : "stock-mostbought_container_negative"
                      }
                    >
                      ({isPositive ? "+" : ""}
                      {stock.perChange.toFixed(2)})
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stocks;
