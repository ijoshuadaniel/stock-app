import mongoose from "mongoose";

const stockInfo = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    equityInfo: {
      type: Object,
    },
    quoteInfo: {
      type: Object,
    },
    corpInfoData: {
      type: Object,
    },
    chartData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const StockInfoModel = mongoose.model("stockInfo", stockInfo);

export default StockInfoModel;
