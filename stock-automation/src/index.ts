import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import NseRouter from "./routers/nseRouter";
var cron = require("node-cron");

const app = express();

// cron.schedule("*/5 * * * * *", async () => {
//   await getStockData();
// });

app.use("/v1/nse/", NseRouter);

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/stock");
  console.log("✅ Connected to MongoDb");
};

app.listen(process.env.PORT, async () => {
  connectDB();
  console.info("✅ App Started on " + process.env.PORT);
});
