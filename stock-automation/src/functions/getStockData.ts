import NSEModel from "../models/stock";
import {
  allstocks,
  gainersLoosersUrl,
  mostActiveStocks,
  optionsSymbol,
  optionsUrl,
} from "../utils/constants";
import getCookies from "../utils/getCookies";
import getNseData from "../utils/getNseData";

const getStockData = async () => {
  const stocks = {
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
        if (response.status === 200) {
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
          if (response.status === 200) {
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
        if (activeStockResponse.status === 200) {
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
        if (allStockResponse.status === 200) {
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
    const stocksFromDb = await NSEModel.find({});
    if (stocksFromDb.length > 0) {
      const id = stocksFromDb[0]._id;
      await NSEModel.findByIdAndUpdate(id, stocks);
    } else {
      const stocksData = new NSEModel(stocks);
      stocksData.save();
    }
    console.info("Saved Stock Data From NSE." + Date.now());
  } catch (error) {
    console.error("Error processing stocks data:", error);
  }
};

export default getStockData;
