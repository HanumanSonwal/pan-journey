// modules/hotel/hotel.controller.js

import { searchHotelsFromSupplier } from "./searchservice.js";
import { sendSuccess, sendError } from "../../utils/response/ApiResponse.js";

export const hotelSearchController = async (req, res) => {
  try {
    const result = await searchHotelsFromSupplier(req.body);

    return sendSuccess(res, "Hotels fetched successfully", result);
  } catch (err) {
    return sendError(res, err.message || "Hotel search failed", 500);
  }
};