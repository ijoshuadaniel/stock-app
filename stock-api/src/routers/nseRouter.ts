import express from "express";
import getNseData from "../nse/getNseData";
import {
  allstocks,
  gainersLoosersUrl,
  mostActiveStocks,
  optionsSymbol,
  optionsUrl,
} from "../utils/constants";
import getCookies from "../utils/getCookies";

const NseRouter = express.Router();

interface Stocks {
  market: { [key: string]: any };
  active: object;
  gainers: object;
  loosers: object;
  allstock: object;
}

NseRouter.get("/stocks", async (req, res) => {
  const stocks: Stocks = {
    market: {},
    active: {},
    gainers: {},
    loosers: {},
    allstock: {},
  };

  try {
    const cookies = await getCookies();
    const marketSymbolsPromises = optionsSymbol.map(async (symbol: string) => {
      try {
        const response = await getNseData(optionsUrl + symbol, cookies.cookies);
        if (response.status === "Success") {
          stocks.market[symbol] = response.data.data[0];
        } else {
          console.log(`Failed to fetch data for ${symbol}`);
        }
      } catch (error) {
        console.log(`Error fetching data for ${symbol}:`, error);
      }
    });

    const gainersLoosers = ["gainers", "loosers"].map(
      async (symbol: string) => {
        try {
          const response = await getNseData(
            gainersLoosersUrl + symbol,
            cookies.cookies
          );
          if (response.status === "Success") {
            stocks[symbol] = response.data.allSec.data;
          } else {
            console.log(`Failed to fetch data for ${symbol}`);
          }
        } catch (error) {
          console.log(`Error fetching data for ${symbol}:`, error);
        }
      }
    );

    const activeStockPromise = async () => {
      try {
        const activeStockResponse = await getNseData(
          mostActiveStocks,
          cookies.cookies
        );
        if (activeStockResponse.status === "Success") {
          stocks.active = activeStockResponse.data.data;
        } else {
          console.log("Error fetching data for Most Active Stocks");
        }
      } catch (error) {
        console.log("Error fetching data for Most Active Stocks:", error);
      }
    };

    const allStocksData = async () => {
      try {
        const allStockResponse = await getNseData(allstocks, cookies.cookies);
        if (allStockResponse.status === "Success") {
          stocks.allstock = allStockResponse.data.data.UnderlyingList;
        } else {
          console.log("Error fetching data for Most Active Stocks");
        }
      } catch (error) {
        console.log("Error fetching data for Most Active Stocks:", error);
      }
    };

    await Promise.all([
      ...marketSymbolsPromises,
      ...gainersLoosers,
      activeStockPromise(),
      allStocksData(),
    ]);

    res.json(stocks);
  } catch (error) {
    console.log("Error processing stocks data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default NseRouter;
