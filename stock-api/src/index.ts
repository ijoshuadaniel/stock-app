import "dotenv/config";
import express from "express";
import NseRouter from "./routers/nseRouter";

const app = express();

app.use("/nse", NseRouter);

app.listen(process.env.PORT, () => {
  console.info("✅ App Started on " + process.env.PORT);
});
