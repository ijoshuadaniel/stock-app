import { Request, Response } from "express";
import StockInfoModel from "../models/stockInfo";
import AutomationAxios from "../utils/automationAxios";
import { stockInfoUrl } from "../utils/constants";
import { code200, code400, codeError } from "../utils/status";

const getStockInfo = async (req: Request, res: Response) => {
  const stock = req.params.stock.toString();
  try {
    const stockInfo = await StockInfoModel.findOne({
      symbol: stock,
    });
    if (stockInfo) {
      res.status(200).json(code200(stockInfo));
    } else {
      const getData = await AutomationAxios.get(`${stockInfoUrl(stock)}`);
      if (getData.status === 200) {
        res.status(200).json(code200(getData.data.data));
      } else {
        res.status(400).json(code400("Failed to process Data."));
      }
    }
  } catch (error) {
    console.error("Error at getStockInfo:", error.message);
    res.status(500).json(
      codeError({
        status: 500,
        message: "Error processing stocks data",
        error: error.msg,
      })
    );
  }
};

export default getStockInfo;
