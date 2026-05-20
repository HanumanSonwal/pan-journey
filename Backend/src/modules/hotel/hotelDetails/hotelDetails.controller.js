// import { fetchHotelDetailsFromSupplier } from "../hotelDetails/hotelDetails.service.js";
// import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

// export const getHotelDetails = async (req, res) => {
//   try {
//     const { hotelKey, searchKey } = req.body;

//     if (!hotelKey || !searchKey) {
//       return sendError(res, "hotelKey and searchKey are required", 400);
//     }

//     const data = await fetchHotelDetailsFromSupplier({
//       hotelKey,
//       searchKey,
//     });

//     return sendSuccess(res, "Hotel details fetched from supplier", data);
//   } catch (err) {
//     return sendError(res, err.message);
//   }
// };

import { fetchHotelDetailsFromSupplier } from "../hotelDetails/hotelDetails.service.js";
import { applyPricing } from "../hotelDetails/hotelPricing.service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

export const getHotelDetails = async (req, res) => {
  try {
    const { hotelKey, searchKey, hotelMeta } = req.body;

    if (!hotelKey || !searchKey) {
      return sendError(res, "hotelKey and searchKey are required", 400);
    }

    if (!hotelMeta) {
      return sendError(res, "hotelMeta required for pricing", 400);
    }

    // 1️⃣ Supplier detail fetch
    const supplierData = await fetchHotelDetailsFromSupplier({
      hotelKey,
      searchKey,
    });

    // 2️⃣ Apply markup + service tax
    const pricing = await applyPricing(supplierData, hotelMeta);

    // 3️⃣ Final response
    return sendSuccess(res, "Hotel details fetched", {
      supplierData,
      pricing,
    });

  } catch (err) {
    return sendError(res, err.message);
  }
};