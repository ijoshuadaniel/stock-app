import "dotenv/config";
import express from "express";
import NseRouter from "./routers/nseRouter";
import connectDB from "./utils/db";
var cron = require("node-cron");

const app = express();

// cron.schedule("*/5 * * * * *", async () => {
//   await getStockData();
// });

app.use("/v1/nse/", NseRouter);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.info("✅ App Started on " + process.env.PORT);
});
