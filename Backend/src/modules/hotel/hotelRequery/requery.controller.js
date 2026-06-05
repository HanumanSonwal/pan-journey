// import { getRequeryByUserService } from "./requery.service.js";
// import {
//   sendSuccess,
//   sendError,
// } from "../../../utils/response/ApiResponse.js";

// export const getRequeryByUserController =
//   async (req, res) => {
//     try {
//       const { UserId } = req.params;

//       const data =
//         await getRequeryByUserService(
//           UserId
//         );

//       return sendSuccess(
//         res,
//         "Requery data fetched successfully",
//         data
//       );
//     } catch (error) {
//       return sendError(
//         res,
//         error.message ||
//           "Failed to fetch requery data",
//         500
//       );
//     }
//   };

import { sendError, sendSuccess } from "../../../utils/response/ApiResponse.js";
import { getHotelRequeryByUserService } from "./requery.service.js";

export const getHotelRequeryByUserController = async (req, res) => {
  try {
    const { UserId } = req.params;

    const data = await getHotelRequeryByUserService(UserId);

    return sendSuccess(
      res,
      "Hotel requery fetched successfully",
      data,
      null,
      200,
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};
