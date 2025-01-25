import mongoose from "mongoose";

const NSE = new mongoose.Schema({
  market: {
    type: Object,
    require: true,
  },
  active: {
    type: Object,
    require: true,
  },
  gainers: {
    type: Object,
    require: true,
  },
  loosers: {
    type: Object,
    require: true,
  },
  allstock: {
    type: Object,
    require: true,
  },
});

const NSEModel = mongoose.model("nse", NSE);

export default NSEModel;
