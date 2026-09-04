import {
  getHotelDetailService,
} from "./hotelDetail.service.js";


// ============================================================
// HOTEL DETAIL CONTROLLER
// ============================================================

export const getHotelDetail = async (req, res) => {
  try {
    console.log("====================================");
    console.log("HOTEL DETAIL REQUEST");
    console.log("Method:", req.method);
    console.log("Body:", req.body);
    console.log("====================================");

    const {
      hotelDetailId,
      hotelId,
    } = req.body || {};

    if (!hotelDetailId) {
      return res.status(400).json({
        success: false,
        message: "hotelDetailId is required",
      });
    }

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "hotelId is required",
      });
    }

    const result = await getHotelDetailService({
      hotelDetailId,
      hotelId,
    });

    return res.status(200).json({
      success: true,
      message: "Hotel details fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("❌ Hotel Detail Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// import { getHotelDetailService } from "./hotelDetail.service.js";
// import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

// export const getHotelDetail = async (req, res) => {
//   try {
//     console.log("====================================");
//     console.log("HOTEL DETAIL REQUEST");
//     console.log("Method:", req.method);
//     console.log("Body:", req.body);
//     console.log("Headers:", req.headers);
//     console.log("====================================");

//     const { hotelDetailId, hotelId } = req.body || {};

//     // =========================
//     // VALIDATION
//     // =========================

//     if (!hotelDetailId) {
//       return sendError(
//         res,
//         "hotelDetailId is required",
//         400
//       );
//     }

//     if (!hotelId) {
//       return sendError(
//         res,
//         "hotelId is required",
//         400
//       );
//     }

//     // =========================
//     // SERVICE CALL
//     // =========================

//     const result = await getHotelDetailService({
//       hotelDetailId,
//       hotelId,
//     });

//     // =========================
//     // SUCCESS RESPONSE
//     // =========================

//     return sendSuccess(
//       res,
//       "Hotel details fetched successfully",
//       result
//     );

//   } catch (error) {
//     console.error("====================================");
//     console.error("HOTEL DETAIL CONTROLLER ERROR");
//     console.error("Message:", error?.message);
//     console.error("Stack:", error?.stack);
//     console.error("====================================");

//     return sendError(
//       res,
//       error?.message || "Failed to fetch hotel details",
//       500
//     );
//   }
// };