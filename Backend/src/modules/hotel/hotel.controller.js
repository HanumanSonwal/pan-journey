import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/response/ApiResponse.js";
import { searchHotelsByCity } from "./hotel.service.js";

export const searchHotels = asyncHandler(async (req, res) => {
  const { city } = req.query;

  const hotels = await searchHotelsByCity(city);

  return sendSuccess(res, "Hotels fetched", hotels);
});