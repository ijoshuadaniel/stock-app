import { Request, Response } from "express";
import AutocompleteModel from "../models/autocomplete";
import { autocomplete } from "../utils/constants";
import getCookies from "../utils/getCookies";
import getNseData from "../utils/getNseData";

interface symbolProps {
  symbol: string;
  symbol_info: string;
  symbol_suggest: object[];
  result_type: string;
  result_sub_type: string;
  activeSeries: string[];
  listing_date: Date;
  url: string;
}

const getSymbolData = (symbol: symbolProps) => {
  return {
    symbol: symbol.symbol,
    symbolInfo: symbol.symbol_info,
    symbolSuggest: symbol.symbol_suggest,
    resultType: symbol.result_type,
    resultSubType: symbol.result_sub_type,
    activeSeries: symbol.activeSeries,
    listingDate: new Date(symbol.listing_date),
    url: symbol.url,
  };
};

const getAutoComplete = async (req: Request, res: Response) => {
  const { stock } = req.params;
  if (stock) {
    try {
      const cookies = await getCookies();
      const stockData = await getNseData(
        `${autocomplete}${stock}`,
        cookies.cookies
      );
      if (stockData.status === 200) {
        const symbols = stockData.data.symbols;
        symbols
          .filter((f) => f.result_sub_type === "equity")
          .forEach(async (symbol: symbolProps) => {
            const isSymbol = await AutocompleteModel.findOne({
              symbol: symbol.symbol,
            });
            if (isSymbol) {
              await AutocompleteModel.findByIdAndUpdate(
                isSymbol._id,
                getSymbolData(symbol)
              );
            } else {
              const symbolData = new AutocompleteModel(getSymbolData(symbol));
              await symbolData.save();
            }
          });
        const results = symbols
          .filter((f) => f.result_sub_type === "equity")
          .map((sym) => getSymbolData(sym));
        res.status(200).json(results);
      } else {
        res
          .status(400)
          .json({ status: 400, error: "Failed to get stock data." });
      }
    } catch (error) {
      res.status(400).json({ status: 400, error: error.msg });
    }
  } else {
    res
      .status(400)
      .json({ status: 400, error: "Failed. No stock query found!" });
  }
};

export default getAutoComplete;
