import { Request, Response } from "express";
import AutocompleteModel from "../models/autocomplete";
import AutomationAxios from "../utils/automationAxios";
import { autocompleteUrl } from "../utils/constants";
import { code200, code400, codeError } from "../utils/status";

const getAutoCompleteData = async (req: Request, res: Response) => {
  const stock = String(req.query.stock || "");

  try {
    const autocompleteData = await AutocompleteModel.find({
      symbol: { $regex: stock, $options: "i" },
    });
    if (autocompleteData.length > 0) {
      res.status(200).json(code200(autocompleteData));
    } else {
      const getData = await AutomationAxios.get(`${autocompleteUrl}${stock}`);
      if (getData.status === 200) {
        res.status(200).json(code200(getData.data));
      } else {
        res.status(400).json(code400("Failed to process Data."));
      }
    }
  } catch (error) {
    console.error("Error at getAutoCompleteData:", error);
    res.status(500).json(
      codeError({
        status: 500,
        message: "Error processing stocks data",
        error: error.msg,
      })
    );
  }
};

export default getAutoCompleteData;
