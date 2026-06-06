import { hotelTempBookingService } from "../hotelTempBooking/hotle.Service.js";
import { sendSuccess, sendError } from "../../../utils/response/ApiResponse.js";


export const hotelTempBookingController = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      UserId: req.user._id, // token se
    };

    const data = await hotelTempBookingService(payload);

    return sendSuccess(
      res,
      "Hotel temp booking successful",
      data
    );
  } catch (error) {
    return sendError(res, error.message);
  }
};
