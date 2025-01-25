import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import NseRouter from "./routers/nseRouter";

const app = express();

app.use(cors());
app.use("/nse", NseRouter);

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/stock");
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.info("✅ App Started on " + process.env.PORT);
});
