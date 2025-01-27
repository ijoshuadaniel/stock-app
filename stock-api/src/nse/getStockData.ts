import { Request, Response } from "express";
import NSEModel from "../models/stock";

const getStockMarketData = async (req: Request, res: Response) => {
  try {
    const stocks = await NSEModel.findOne({});
    res.status(200).json(stocks);
  } catch (error) {
    console.error("Error processing stocks data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getStockMarketData;
