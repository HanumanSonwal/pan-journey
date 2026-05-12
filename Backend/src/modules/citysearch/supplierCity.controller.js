// import { searchDestinationFromSupplier } from "../citysearch/supplierCity.service.js";


// export const supplierCitySearchController = async (req, res) => {
//   try {
//     // 👉 body se read karenge
//     const { SearchInput } = req.body;

//     if (!SearchInput) {
//       return res.status(400).json({ message: "SearchInput is required" });
//     }

//     const destinations = await searchDestinationFromSupplier(SearchInput);

//     res.json({
//       success: true,
//       count: destinations.length,
//       data: destinations,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Supplier city search failed" });
//   }
// };

import { searchDestinationFromSupplier } from "../citysearch/supplierCity.service.js";

import {
  sendSuccess,
  sendError,
} from "../../utils/response/ApiResponse.js";

export const supplierCitySearchController = async (req, res) => {
  try {
    const { SearchInput } = req.body;

    if (!SearchInput) {
      return sendError(
        res,
        "SearchInput is required",
        400
      );
    }

    const destinations =
      await searchDestinationFromSupplier(SearchInput);

    return sendSuccess(
      res,
      "Destination fetched successfully",
      destinations,
      {
        total: destinations.length,
      }
    );
  } catch (err) {
    console.log(err);

    return sendError(
      res,
      err.message || "Supplier city search failed",
      500
    );
  }
};