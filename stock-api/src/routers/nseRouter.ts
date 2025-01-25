import cors from "cors";
import express from "express";
import getStockMarketData from "../nse/getStockData";
const NseRouter = express.Router();

interface Stocks {
  market: { [key: string]: any };
  active: object;
  gainers: object;
  loosers: object;
  allstock: object;
}

NseRouter.use(cors());

NseRouter.get("/stocks", getStockMarketData);

export default NseRouter;
