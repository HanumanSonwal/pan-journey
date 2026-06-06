

import {
  sendError,
  sendSuccess,
} from "../../../utils/response/ApiResponse.js";
 import { getHotelRequeryByUserService } from "./requery.service.js";


export const getHotelRequeryByUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookingRefNo } = req.query;

    const data = await getHotelRequeryByUserService(
      userId,
      bookingRefNo
    );

    return sendSuccess(
      res,
      "Hotel requery fetched successfully",
      data,
      null,
      200
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};