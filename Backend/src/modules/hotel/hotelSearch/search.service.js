// import { searchHotelAPI } from "./adapters/flyshop/hotelSearch.api.js";
// import { mapHotelSearchRequest } from "./adapters/flyshop/hotelSearch.request.mapper.js";
// import { mapHotelSearchResponse } from "./adapters/flyshop/hotelSearch.response.mapper.js";
// import { saveHotelSearch,findHotelSearchCache } from "./hotelSearch.repository.js";

// export const searchHotelService = async (payload) => {
//   const supplierPayload =
//     mapHotelSearchRequest(payload);

//   const supplierResponse =
//     await searchHotelAPI(supplierPayload);

//   await saveHotelSearch({
//     searchId: supplierResponse?.SearchID,
//     searchKey: supplierResponse?.SearchKey,

//     supplier: "flyshop",

//     destination: supplierPayload.Origin,

//     checkIn: new Date(payload.checkIn),
//     checkOut: new Date(payload.checkOut),

//     rooms: payload.rooms,

//     hotels: (supplierResponse?.HotelDetails || []).map(
//       (hotel) => ({
//         hotelId: hotel.HotelId,
//         hotelKey: hotel.HotelKey,

//         name: hotel.HotelName,

//         address: hotel.Address,
//         city: hotel.City,
//         state: hotel.state,
//         pincode: hotel.Pincode,

//         latitude: hotel.Latitude
//           ? Number(hotel.Latitude)
//           : null,

//         longitude: hotel.Longitude
//           ? Number(hotel.Longitude)
//           : null,

//         image: hotel.HotelImage,

//         starCategory: hotel.StarCategoryId
//           ? Number(hotel.StarCategoryId)
//           : null,

//         facilities: (
//           hotel.HotelFacilities || []
//         ).map((facility) => ({
//           id: facility.FacilityId,
//           name: facility.FacilityName?.trim(),
//         })),

//         pricing: {
//           basicAmount: Number(
//             hotel.LowestBasicAmount || 0
//           ),

//           tax: Number(
//             hotel.LowestRateTax || 0
//           ),

//           totalAmount: Number(
//             hotel.TotalAmount || 0
//           ),

//           serviceFee: Number(
//             hotel.ServiceFeeAmount || 0
//           ),

//           markup: Number(
//             hotel.TradeMarkupAmount || 0
//           ),

//           gst: Number(hotel.GST || 0),
//         },

//         checkIn: {
//           date: hotel.CheckInDate,
//           time: hotel.CheckInTime,
//         },

//         checkOut: {
//           date: hotel.CheckOutDate,
//           time: hotel.CheckOutTime,
//         },

//         supplier: "flyshop",
//       })
//     ),

//     totalHotels:
//       supplierResponse?.HotelDetails?.length || 0,

//     moreHotels:
//       supplierResponse?.MoreHotels || false,

//     responseStatus:
//       supplierResponse?.Response_Header?.ErrorCode,

//     rawResponse: supplierResponse,

//     // 30 minutes
//     expiresAt: new Date(
//       Date.now() + 30 * 60 * 1000
//     ),
//   });

//   return mapHotelSearchResponse(
//     supplierResponse
//   );
// };                                                         q

import { searchHotelAPI } from "./adapters/flyshop/hotelSearch.api.js";

import {
  mapHotelSearchRequest,
} from "./adapters/flyshop/hotelSearch.request.mapper.js";

import {
  saveHotelSearch,
  findHotelSearchCache,
} from "./hotelSearch.repository.js";

import HotelSearch from "./hotelSearch.model.js";

import { queryBuilder } from "../../../utils/queryBuilder.js";
const pricing = "pricing.totalAmount";
const getHotelSearchResult = async ({ cacheKey, payload }) => {
  return queryBuilder({
    model: HotelSearch,

    query: {
      ...payload,
      cacheKey,
    },

    // Current cache document ko hi target karega
    filterFields: ["cacheKey"],

    // hotels embedded array hai
    arrayField: "hotels",

    // Hotel ke andar search
    searchFields: ["name", "city", "address"],

    // Hotel ke filters
    arrayFilterFields: ["starCategory"],

    // Allowed sorting fields
    sortFields: [
      "name",
      "city",
      "starCategory",
      "pricing.totalAmount",
      "pricing.basicAmount",
    ],

    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  });
};
export const searchHotelService = async (payload) => {
  /*
  |--------------------------------------------------------------------------
  | SUPPLIER PAYLOAD
  |--------------------------------------------------------------------------
  */

  const supplierPayload = mapHotelSearchRequest(payload);

  /*
  |--------------------------------------------------------------------------
  | CACHE KEY
  |--------------------------------------------------------------------------
  */

  const cacheKey = JSON.stringify({
    supplier: "flyshop",
    destination: supplierPayload.Origin,
    checkIn: payload.checkIn,
    checkOut: payload.checkOut,
    rooms: payload.rooms,
  });

  /*
  |--------------------------------------------------------------------------
  | CHECK CACHE
  |--------------------------------------------------------------------------
  */

  const cachedSearch = await findHotelSearchCache({
    cacheKey,
  });

  /*
  |--------------------------------------------------------------------------
  | CACHE HIT
  |--------------------------------------------------------------------------
  */

  if (cachedSearch) {
    console.log("Hotel search cache HIT:", cachedSearch.searchId);

    const result = await getHotelSearchResult({
      cacheKey,
      payload,
    });

    return {
      searchId: cachedSearch.searchId,
      searchKey: cachedSearch.searchKey,

      ...result,

      moreHotels: cachedSearch.moreHotels,

      fromCache: true,
    };
  }
  /*
  |--------------------------------------------------------------------------
  | CACHE MISS
  |--------------------------------------------------------------------------
  */

  console.log("Hotel search cache MISS - calling supplier");

  const supplierResponse = await searchHotelAPI(supplierPayload);

  /*
  |--------------------------------------------------------------------------
  | SAVE CACHE
  |--------------------------------------------------------------------------
  */

  const savedSearch = await saveHotelSearch({
    cacheKey,

    searchId: supplierResponse?.SearchID,

    searchKey: supplierResponse?.SearchKey,

    supplier: "flyshop",

    destination: supplierPayload.Origin,

    checkIn: new Date(payload.checkIn),

    checkOut: new Date(payload.checkOut),

    rooms: payload.rooms,

    hotels: (supplierResponse?.HotelDetails || []).map((hotel) => ({
      hotelId: hotel.HotelId,
      hotelKey: hotel.HotelKey,

      name: hotel.HotelName,

      address: hotel.Address,
      city: hotel.City,
      state: hotel.state,
      pincode: hotel.Pincode,

      latitude: hotel.Latitude ? Number(hotel.Latitude) : null,

      longitude: hotel.Longitude ? Number(hotel.Longitude) : null,

      image: hotel.HotelImage,

      starCategory: hotel.StarCategoryId ? Number(hotel.StarCategoryId) : null,

      facilities: (hotel.HotelFacilities || []).map((facility) => ({
        id: facility.FacilityId,
        name: facility.FacilityName?.trim(),
      })),

      pricing: {
        basicAmount: Number(hotel.LowestBasicAmount || 0),

        tax: Number(hotel.LowestRateTax || 0),

        totalAmount: Number(hotel.TotalAmount || 0),

        serviceFee: Number(hotel.ServiceFeeAmount || 0),

        markup: Number(hotel.TradeMarkupAmount || 0),

        gst: Number(hotel.GST || 0),
      },

      checkIn: {
        date: hotel.CheckInDate,
        time: hotel.CheckInTime,
      },

      checkOut: {
        date: hotel.CheckOutDate,
        time: hotel.CheckOutTime,
      },

      supplier: "flyshop",
    })),

    totalHotels: supplierResponse?.HotelDetails?.length || 0,

    moreHotels: supplierResponse?.MoreHotels || false,

    responseStatus: supplierResponse?.Response_Header?.ErrorCode,

    rawResponse: supplierResponse,

    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
  });

  /*
  |--------------------------------------------------------------------------
  | RESPONSE
  |--------------------------------------------------------------------------
  */

  const result = await getHotelSearchResult({
    cacheKey,
    payload,
  });

  return {
    searchId: savedSearch.searchId,
    searchKey: savedSearch.searchKey,

    ...result,

    moreHotels: savedSearch.moreHotels,

    fromCache: false,
  };
};
