

import HotelSearch from "../hotelSearch/hotelSearch.model.js";

import {
  getHotelDetailAPI,
} from "./adapters/hotelDetail.api.js";

import {
  mapHotelDetailRequest,
} from "./adapters/hotelDetail.request.mapper.js";

import {
  mapHotelDetailResponse,
} from "./adapters/hotelDetail.response.mapper.js";


// ============================================================
// HOTEL DETAIL SERVICE
// ============================================================

export const getHotelDetailService = async ({
  hotelDetailId,
  hotelId,
}) => {

  // ==========================================================
  // 1. VALIDATION
  // ==========================================================

  if (!hotelDetailId) {
    throw new Error("hotelDetailId is required");
  }

  if (!hotelId) {
    throw new Error("hotelId is required");
  }


  // ==========================================================
  // 2. FIND HOTEL SEARCH
  // ==========================================================

  const hotelSearch =
    await HotelSearch.findOne({
      hotelDetailId,
    }).lean();


  if (!hotelSearch) {
    throw new Error(
      "Hotel search not found"
    );
  }


  // ==========================================================
  // 3. FIND SELECTED HOTEL
  // ==========================================================

  const hotel =
    hotelSearch.hotels?.find(
      (item) =>
        String(item.hotelId) ===
        String(hotelId)
    );


  if (!hotel) {
    throw new Error(
      "Hotel not found for given hotelDetailId and hotelId"
    );
  }


  // ==========================================================
  // 4. HOTEL KEY
  // ==========================================================

  const hotelKey =
    hotel.hotelKey;


  if (!hotelKey) {
    throw new Error(
      "HotelKey not found for selected hotel"
    );
  }


  // ==========================================================
  // 5. SEARCH KEY
  // ==========================================================

  const searchKey =
    hotelSearch.searchKey;


  if (!searchKey) {
    throw new Error(
      "SearchKey not found for hotel search"
    );
  }


  // ==========================================================
  // 6. SUPPLIER REQUEST
  // ==========================================================

  const supplierPayload =
    mapHotelDetailRequest({
      hotelKey,
      searchKey,
    });


  // ==========================================================
  // 7. SUPPLIER API
  // ==========================================================

  const supplierResponse =
    await getHotelDetailAPI(
      supplierPayload
    );


  // ==========================================================
  // 8. MAP SUPPLIER RESPONSE
  // ==========================================================

  const mappedResponse =
    mapHotelDetailResponse({
      hotel,
      details:
        supplierResponse,
    });


  // ==========================================================
  // 9. FINAL SERVICE RESPONSE
  // ==========================================================

  return mappedResponse;
};