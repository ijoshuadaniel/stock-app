import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import getStockData from "./functions/getStockData";
var cron = require("node-cron");

const app = express();

cron.schedule("*/5 * * * * *", async () => {
  await getStockData();
});

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/stock");
};

app.listen(process.env.PORT, async () => {
  connectDB();
  console.info("✅ App Started on " + process.env.PORT);
});
