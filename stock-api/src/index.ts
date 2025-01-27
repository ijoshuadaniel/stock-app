import cors from "cors";
import "dotenv/config";
import express from "express";
import NseRouter from "./routers/nseRouter";
import connectDB from "./utils/db";

const app = express();

app.use(cors());
app.use("/nse", NseRouter);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.info("✅ App Started on " + process.env.PORT);
});
