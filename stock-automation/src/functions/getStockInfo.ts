import { Request, Response } from "express";
import StockInfoModel from "../models/stockInfo";
import {
  chartInfoData,
  corpInfo,
  equityMetaInfo,
  quoteEquityMetaInfo,
} from "../utils/constants";
import getCookies from "../utils/getCookies";
import getNseData from "../utils/getNseData";

const getAllData = async (stock) => {
  try {
    const cookie = await getCookies();
    const requests = [
      getNseData(equityMetaInfo(stock), cookie.cookies),
      getNseData(quoteEquityMetaInfo(stock), cookie.cookies),
      getNseData(corpInfo(stock), cookie.cookies),
      getNseData(chartInfoData(stock), cookie.cookies),
    ];
    const [equityInfo, quoteInfo, corpInfoData, chartData] = await Promise.all(
      requests
    );
    return {
      symbol: equityInfo.data.symbol,
      equityInfo: equityInfo.data,
      quoteInfo: quoteInfo.data,
      corpInfoData: corpInfoData.data,
      chartData: chartData.data,
    };
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

const getStockInfo = async (req: Request, res: Response) => {
  const { stock } = req.params;
  if (stock) {
    try {
      const result = await getAllData(stock);
      if (result) {
        const isSymbolExist = await StockInfoModel.findOne({
          symbol: stock,
        });
        if (isSymbolExist) {
          const fiveMinutes = 1 * 60 * 1000; // 5 minutes in milliseconds
          const isMoreThan5Mins =
            new Date().getTime() - new Date(isSymbolExist.updatedAt).getTime() >
            fiveMinutes;
          if (isMoreThan5Mins) {
            await StockInfoModel.findByIdAndUpdate(isSymbolExist._id, result);
          }
        } else {
          const saveStockInfo = new StockInfoModel(result);
          await saveStockInfo.save();
        }
        res.status(200).json({ status: 200, data: result });
      } else {
        res.status(400).json({ status: 400, error: "An error occurred." });
      }
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ status: 400, error: "An error occurred." });
    }
  } else {
    res
      .status(400)
      .json({ status: 400, error: "Failed. No stock query found!" });
  }
};

export default getStockInfo;
