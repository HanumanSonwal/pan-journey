import { searchDestinationFromSupplier } from "../citysearch/supplierCity.service.js";
import {
  sendSuccess,
  sendError,
} from "../../utils/response/ApiResponse.js";

export const supplierCitySearchController = async (req, res) => {
  try {
    const { SearchInput } = req.body;

    /* ===============================
       CASE 1 → No Search Input
       Return Popular Cities
    =============================== */
    if (!SearchInput || SearchInput.trim() === "") {
      const popularCities = [
        { id: "437227", name: "Paris", city: "Paris, France" },
        { id: "480416", name: "Rome", city: "Rome, Lazio, Italy" },
        { id: "246673", name: "Singapore", city: "Singapore" },
        { id: "221688", name: "Dubai", city: "Dubai, UAE" }
      ];

      return sendSuccess(
        res,
        "Popular destinations fetched successfully",
        popularCities
      );
    }

    /* ===============================
       CASE 2 → Search From Supplier
    =============================== */
    const destinations = await searchDestinationFromSupplier(SearchInput);

    return sendSuccess(
      res,
      "Destination fetched successfully",
      destinations
    );

  } catch (err) {
    console.log("Supplier city search error:", err);

    return sendError(
      res,
      err.message || "Supplier city search failed",
      500
    );
  }
};