import express from "express";
import getAutoComplete from "../functions/getAutoComplete";
import getStockInfo from "../functions/getStockInfo";

const NseRouter = express.Router();

NseRouter.get("/autocomplete/:stock", getAutoComplete);
NseRouter.get("/stockinfo/:stock", getStockInfo);

export default NseRouter;
