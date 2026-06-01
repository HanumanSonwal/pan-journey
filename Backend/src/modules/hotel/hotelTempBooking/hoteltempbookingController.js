import { hotelTempBookingService } from "../hotelTempBooking/hotle.Service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";

export const hotelTempBookingController = async (req, res) => {
  const requestStartTime = Date.now();

  try {
    console.log("==================================================");
    console.log("🏨 HOTEL TEMP BOOKING CONTROLLER STARTED");
    console.log("==================================================");

    console.log("📥 REQUEST BODY =>");
    console.log(JSON.stringify(req.body, null, 2));

    console.log("==================================================");
    console.log("📡 CALLING HOTEL TEMP BOOKING SERVICE...");
    console.log("==================================================");

    const result = await hotelTempBookingService(req.body);

    const responseTime = Date.now() - requestStartTime;

    console.log("==================================================");
    console.log("✅ HOTEL TEMP BOOKING SUCCESS");
    console.log("⏱ TOTAL RESPONSE TIME =>", `${responseTime} ms`);

    console.log("📦 SERVICE RESPONSE =>");
    console.log(JSON.stringify(result, null, 2));

    console.log("==================================================");

    return sendSuccess(
      res,
      "Hotel temp booking successful",
      result,
      {
        responseTime: `${responseTime} ms`,
      },
      200
    );
  } catch (error) {
    const responseTime = Date.now() - requestStartTime;

    console.log("==================================================");
    console.log("❌ HOTEL TEMP BOOKING CONTROLLER FAILED");
    console.log("⏱ FAILED AFTER =>", `${responseTime} ms`);
    console.log("==================================================");

    console.log("🚨 ERROR MESSAGE =>");
    console.log(error.message);

    console.log("==================================================");

    console.log("🚨 ERROR RESPONSE DATA =>");
    console.log(
      JSON.stringify(error?.response?.data || null, null, 2)
    );

    console.log("==================================================");

    console.log("🚨 ERROR STATUS =>");
    console.log(error?.response?.status);

    console.log("==================================================");

    console.log("🚨 FULL ERROR OBJECT =>");

    console.dir(
      {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
        stack: error.stack,
      },
      { depth: null }
    );

    console.log("==================================================");

    return sendError(
      res,
      "Hotel temp booking failed",
      error?.response?.status || 500,
      error?.response?.data || error.message
    );
  }
};