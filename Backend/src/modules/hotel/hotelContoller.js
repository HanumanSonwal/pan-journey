
import { searchHotelsFromSupplier } from "./searchservice.js";
import { sendSuccess, sendError } from "../../utils/response/ApiResponse.js";

export const hotelSearchController = async (req, res) => {
  try {
    // 👇 AB PURA BODY SERVICE KO JAYEGA
    const result = await searchHotelsFromSupplier(req.body);

    return sendSuccess(res, "Hotels fetched successfully", result);

  } catch (err) {
    console.log("Hotel search error:", err);
    return sendError(res, err.message || "Hotel search failed", 500);
  }
};