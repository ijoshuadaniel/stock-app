import mongoose from "mongoose";

const autocomplete = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  symbolInfo: {
    type: String,
  },
  symbolSuggest: {
    type: Array,
  },
  resultType: {
    type: String,
  },
  resultSubType: {
    type: String,
  },
  activeSeries: [
    {
      type: String,
    },
  ],
  listingDate: {
    type: Date,
  },
  url: {
    type: String,
  },
});

const AutocompleteModel = mongoose.model("autocomplete", autocomplete);

export default AutocompleteModel;
