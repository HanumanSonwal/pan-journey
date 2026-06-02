// modules/hotel/hotel.controller.js

import { searchHotelsFromSupplier } from "./searchservice.js";
import { sendSuccess, sendError } from "../../utils/response/ApiResponse.js";
import{detectCurrencyFromIP} from "../currencyConverter/currency.detect.js"

export const hotelSearchController = async (req, res) => {
  try {
    // const result = await searchHotelsFromSupplier(req.body);
let currencySource = "manual";

if (!req.body.currency) {
  req.body.currency =
    detectCurrencyFromIP(req);

  currencySource = "auto";
}

const result =
  await searchHotelsFromSupplier(req.body);

result.currencySource =
  currencySource;
    return sendSuccess(res, "Hotels fetched successfully", result);
  } catch (err) {
    return sendError(res, err.message || "Hotel search failed", 500);
  }
};