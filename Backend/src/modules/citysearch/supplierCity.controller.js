

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