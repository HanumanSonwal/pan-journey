import HotelSearch from "../search/hotelSearch.model.js";

import {
  getHotelDetailsAPI,
} from "./adapters/flyshop/hotelDetails.api.js";


// ============================================================
// GET HOTEL DETAILS
// ============================================================

export const getHotelDetailsService = async ({
  hotelId,
}) => {

  // ----------------------------------------------------------
  // 1. VALIDATE HOTEL ID
  // ----------------------------------------------------------

  if (!hotelId) {
    throw new Error("Hotel ID is required");
  }


  // ----------------------------------------------------------
  // 2. FIND HOTEL FROM SEARCH CACHE
  // ----------------------------------------------------------

  const hotelSearch =
    await HotelSearch.findOne(
      {
        "hotels.hotelId": String(hotelId),
      },
      {
        searchKey: 1,
        supplier: 1,
        hotels: 1,
      }
    ).lean();


  // ----------------------------------------------------------
  // 3. HOTEL NOT FOUND
  // ----------------------------------------------------------

  if (!hotelSearch) {
    throw new Error(
      "Hotel not found in search cache"
    );
  }


  // ----------------------------------------------------------
  // 4. FIND PARTICULAR HOTEL
  // ----------------------------------------------------------

  const hotel =
    hotelSearch.hotels.find(
      (item) =>
        String(item.hotelId) ===
        String(hotelId)
    );


  if (!hotel) {
    throw new Error(
      "Hotel not found"
    );
  }


  // ----------------------------------------------------------
  // 5. GET HOTEL KEY
  // ----------------------------------------------------------

  const hotelKey =
    hotel.hotelKey;


  // ----------------------------------------------------------
  // 6. GET SEARCH KEY
  // ----------------------------------------------------------

  const searchKey =
    hotelSearch.searchKey;


  if (!hotelKey) {
    throw new Error(
      "HotelKey not found for this hotel"
    );
  }


  if (!searchKey) {
    throw new Error(
      "SearchKey not found for this hotel"
    );
  }


  console.log(
    "Hotel found:",
    hotel.name
  );

  console.log(
    "HotelKey:",
    hotelKey
  );

  console.log(
    "SearchKey:",
    searchKey
  );


  // ----------------------------------------------------------
  // 7. CALL SUPPLIER HOTEL DETAILS API
  // ----------------------------------------------------------

  const supplierResponse =
    await getHotelDetailsAPI({
      hotelKey,
      searchKey,
    });


  // ----------------------------------------------------------
  // 8. RETURN RESPONSE
  // ----------------------------------------------------------

  return {
    hotelId,

    hotelKey,

    searchKey,

    hotel: {
      name: hotel.name,
      image: hotel.image,
      starCategory: hotel.starCategory,

      address: hotel.address,
      city: hotel.city,
      state: hotel.state,
      pincode: hotel.pincode,

      latitude: hotel.latitude,
      longitude: hotel.longitude,

      facilities: hotel.facilities,

      pricing: hotel.pricing,

      checkIn: hotel.checkIn,
      checkOut: hotel.checkOut,
    },

    supplierResponse,
  };
};