import { fetchHotelDetailsFromSupplier } from "../hotelDetails/hotelDetails.service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

export const getHotelDetails = async (req, res) => {
  try {
    const { hotelKey, searchKey } = req.body;

    if (!hotelKey || !searchKey) {
      return sendError(res, "hotelKey and searchKey are required", 400);
    }

    const data = await fetchHotelDetailsFromSupplier({
      hotelKey,
      searchKey,
    });

    return sendSuccess(res, "Hotel details fetched from supplier", data);
  } catch (err) {
    return sendError(res, err.message);
  }
};