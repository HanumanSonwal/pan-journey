// import axios from "axios";

// export const getCurrencies =
// async (req, res) => {

//   try {

//     const response = await axios.get(
//       `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/codes`
//     );

//     const currencies =
//       response.data.supported_codes;

//     const formatted =
//       currencies.map((item) => ({
//         code: item[0],
//         name: item[1],
//       }));

//     return res.status(200).json({
//       success: true,
//       data: formatted,
//     });

//   } catch (error) {

//     console.log(error.message);

//     return res.status(500).json({
//       success: false,
//       message:
//         "Failed to fetch currencies",
//     });
//   }
// };

import axios from "axios";

import {
  sendSuccess,
  sendError,
} from "../../utils/response/ApiResponse.js";

export const getCurrencies =
async (req, res) => {

  try {

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/codes`
    );

    const currencies =
      response.data.supported_codes;

    const formatted =
      currencies.map((item) => ({
        code: item[0],
        name: item[1],
      }));

    return sendSuccess(
      res,
      "Currencies fetched successfully",
      formatted,
      null,
      200
    );

  } catch (error) {

    console.log(
      "Currency List Error:",
      error.message
    );

    return sendError(
      res,
      "Failed to fetch currencies",
      500,
      error?.response?.data ||
        error.message
    );
  }
};