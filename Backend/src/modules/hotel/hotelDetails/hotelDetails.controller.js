
import { fetchHotelDetailsFromSupplier } from "../hotelDetails/hotelDetails.service.js";
import { applyPricing } from "../hotelDetails/hotelPricing.service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

export const getHotelDetails = async (req, res) => {
  try {
     req.body.currency = req.currency;
    const { hotelId, hotelMeta } = req.body;

    // 1️⃣ Validation
    if (!hotelId) {
      return sendError(res, "hotelId is required", 400);
    }

    if (!hotelMeta) {
      return sendError(res, "hotelMeta required for pricing", 400);
    }

    // 2️⃣ Supplier detail fetch
    const supplierData = await fetchHotelDetailsFromSupplier({
      hotelId,
      hotelMeta,
         currency: req.currency,
    });

    // 3️⃣ Apply pricing
    const pricingData = await applyPricing(
      supplierData,
      hotelMeta,
        req.currency

    );

    // 4️⃣ Final response
    return sendSuccess(
      res,
      "Hotel details fetched",
      pricingData
    );

  } catch (err) {

    return sendError(
      res,
      err.message || "Something went wrong"
    );
  }
};