
// import { fetchHotelDetailsFromSupplier } from "../hotelDetails/hotelDetails.service.js";
// import { applyPricing } from "../hotelDetails/hotelPricing.service.js";
// import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";


// export const getHotelDetails = async (req, res) => {
//   try {
//     req.body.currency = req.currency;

//     // FIX HERE
//     const { hotelId, hotelMeta, searchContext } = req.body;

//     if (!hotelId) {
//       return sendError(res, "hotelId is required", 400);
//     }

//     if (!hotelMeta) {
//       return sendError(res, "hotelMeta required", 400);
//     }

//     const supplierData =
//       await fetchHotelDetailsFromSupplier({
//         hotelId,
//         hotelMeta,
//         searchContext
//       });

//    const pricingData = await applyPricing(
//   supplierData,
   
//   {
//     ...hotelMeta,
//     hotelId
//   },
//   req.currency
// );

//     return sendSuccess(
//       res,
//       "Hotel details fetched",
//       pricingData
//     );

//   } catch (err) {
//     return sendError(
//       res,
//       err.message || "Something went wrong",
//       500
//     );
//   }
// };