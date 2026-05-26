// import { hotelSearchService } from "./hotel.service.js";
// import { sendSuccess, sendError } from "../../utils/response/ApiResponse.js";

// export const hotelSearch = async (req, res) => {
//   try {
//     const {
//       checkInDate,
//       checkOutDate,
//       rooms,
//       destination,
//       destinationId,
//       roomCount,
//     } = req.body;

//     const response = await hotelSearchService({
//       checkInDate,
//       checkOutDate,
//       rooms,
//       destination,
//       destinationId,
//       roomCount,
//     });

//     return sendSuccess(
//       res,
//       "Hotel search fetched successfully",
//       response
//     );
//   } catch (error) {
//     return sendError(
//       res,
//       "Failed to fetch hotel search",
//       500,
//       error
//     );
//   }
// };

import { hotelSearchService } from "./hotel.service.js";
import { sendSuccess, sendError } from "../../utils/response/ApiResponse.js";

export const hotelSearch = async (req, res) => {
  try {

    console.log("======================================");
    console.log("🚀 HOTEL SEARCH CONTROLLER HIT");
    console.log("======================================");

    console.log("📥 REQUEST BODY =>");

    console.log(JSON.stringify(req.body, null, 2));

    console.log("======================================");

    const {
      checkInDate,
      checkOutDate,
      rooms,
      destination,
      destinationId,
      roomCount,
    } = req.body;

    console.log("📌 EXTRACTED VALUES =>");

    console.log({
      checkInDate,
      checkOutDate,
      rooms,
      destination,
      destinationId,
      roomCount,
    });

    console.log("======================================");

    console.log("📡 CALLING HOTEL SERVICE...");

    const response = await hotelSearchService({
      checkInDate,
      checkOutDate,
      rooms,
      destination,
      destinationId,
      roomCount,
    });

    console.log("======================================");

    console.log("✅ HOTEL SERVICE SUCCESS");

    console.log("======================================");

    console.log("📦 FINAL RESPONSE =>");

    console.log(JSON.stringify(response, null, 2));

    console.log("======================================");

    return sendSuccess(
      res,
      "Hotel search fetched successfully",
      response
    );

  } catch (error) {

    console.log("======================================");
    console.log("❌ CONTROLLER ERROR");
    console.log("======================================");

    console.log("🧨 ERROR =>");

    console.log(error);

    console.log("======================================");

    if (error?.response) {

      console.log("📥 ERROR RESPONSE STATUS =>");

      console.log(error.response.status);

      console.log("======================================");

      console.log("📥 ERROR RESPONSE DATA =>");

      console.log(
        JSON.stringify(error.response.data, null, 2)
      );

      console.log("======================================");
    }

    return sendError(
      res,
      "Failed to fetch hotel search",
      500,
      error
    );
  }
};