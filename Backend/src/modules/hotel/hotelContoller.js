// modules/hotel/hotel.controller.js

import { sendError, sendSuccess } from "../../utils/response/ApiResponse.js";
import { searchHotelsFromSupplier } from "./searchservice.js";

export const hotelSearchController = async (req, res) => {
  try {
    req.body.currency = req.currency;

    const result = await searchHotelsFromSupplier(req.body);

    return sendSuccess(res, "Hotels fetched successfully", result);
  } catch (err) {
    return sendError(res, err.message || "Hotel search failed", 500);
  }
};
