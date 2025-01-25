import cors from "cors";
import express from "express";
import getAutoCompleteData from "../nse/getAutoCompleteData";
import getStockMarketData from "../nse/getStockData";
import getStockInfo from "../nse/getStockInfo";
const NseRouter = express.Router();

NseRouter.use(cors());

NseRouter.get("/stocks", getStockMarketData);
NseRouter.get("/autocomplete", getAutoCompleteData);
NseRouter.get("/stockinfo/:stock", getStockInfo);

export default NseRouter;
