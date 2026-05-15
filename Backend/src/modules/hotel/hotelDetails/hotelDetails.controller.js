import { fetchSupplierHotelDetails } from "./hotelDetails.service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

export const getHotelDetails = async (req, res) => {
  try {
    const { hotelKey, searchKey } = req.body;

    if (!hotelKey || !searchKey) {
      return sendError(res, "hotelKey and searchKey are required", 400);
    }

    const supplierResponse = await fetchSupplierHotelDetails({
      hotelKey,
      searchKey,
    });

    // 🧠 Extract only useful data for frontend
    const hotelDetails = supplierResponse?.HotelDetails || supplierResponse;

    return sendSuccess(
      res,
      "Hotel details fetched successfully",
      hotelDetails
    );

  } catch (error) {
    return sendError(res, error.message);
  }
};