// // // import HotelSearch from "../hotelSearch/hotelSearch.model.js";

// // // import {
// // //   getHotelDetailAPI,
// // // } from "./adapters/hotelDetail.api.js";

// // // import {
// // //   mapHotelDetailRequest,
// // // } from "./adapters/hotelDetail.request.mapper.js";

// // // import {
// // //   mapHotelDetailResponse,
// // // } from "./adapters/hotelDetail.response.mapper.js";


// // // // ============================================================
// // // // HOTEL DETAIL SERVICE
// // // // ============================================================

// // // export const getHotelDetailService = async ({
// // //   hotelDetailId,
// // //   hotelId,
// // // }) => {

// // //   try {

// // //     console.log(
// // //       "=========================================="
// // //     );

// // //     console.log(
// // //       "HOTEL DETAIL REQUEST"
// // //     );

// // //     console.log(
// // //       "hotelDetailId:",
// // //       hotelDetailId
// // //     );

// // //     console.log(
// // //       "hotelId:",
// // //       hotelId
// // //     );

// // //     console.log(
// // //       "=========================================="
// // //     );


// // //     // ========================================================
// // //     // 1. VALIDATION
// // //     // ========================================================

// // //     if (!hotelDetailId) {
// // //       throw new Error(
// // //         "hotelDetailId is required"
// // //       );
// // //     }

// // //     if (!hotelId) {
// // //       throw new Error(
// // //         "hotelId is required"
// // //       );
// // //     }


// // //     // ========================================================
// // //     // 2. FIND SEARCH DOCUMENT
// // //     // ========================================================

// // //     console.log(
// // //       "Finding hotel search document..."
// // //     );

// // //     const hotelSearch =
// // //       await HotelSearch.findOne({
// // //         hotelDetailId,
// // //       }).lean();


// // //     console.log(
// // //       "Hotel search found:",
// // //       !!hotelSearch
// // //     );


// // //     if (!hotelSearch) {

// // //       throw new Error(
// // //         "Hotel search not found"
// // //       );
// // //     }


// // //     // ========================================================
// // //     // 3. FIND HOTEL INSIDE HOTELS ARRAY
// // //     // ========================================================

// // //     console.log(
// // //       "Searching hotel inside hotels array..."
// // //     );

// // //     const hotel =
// // //       hotelSearch.hotels?.find(
// // //         (item) =>
// // //           String(item.hotelId) ===
// // //           String(hotelId)
// // //       );


// // //     console.log(
// // //       "Hotel found:",
// // //       !!hotel
// // //     );


// // //     if (!hotel) {

// // //       throw new Error(
// // //         "Hotel not found for given hotelDetailId and hotelId"
// // //       );
// // //     }


// // //     // ========================================================
// // //     // 4. GET HOTEL KEY
// // //     // ========================================================

// // //     const hotelKey =
// // //       hotel.hotelKey;


// // //     console.log(
// // //       "HotelKey exists:",
// // //       !!hotelKey
// // //     );


// // //     if (!hotelKey) {

// // //       throw new Error(
// // //         "HotelKey not found for selected hotel"
// // //       );
// // //     }


// // //     // ========================================================
// // //     // 5. GET SEARCH KEY
// // //     // ========================================================

// // //     const searchKey =
// // //       hotelSearch.searchKey;


// // //     console.log(
// // //       "SearchKey exists:",
// // //       !!searchKey
// // //     );


// // //     if (!searchKey) {

// // //       throw new Error(
// // //         "SearchKey not found for hotel search"
// // //       );
// // //     }


// // //     // ========================================================
// // //     // 6. CREATE SUPPLIER PAYLOAD
// // //     // ========================================================

// // //     const supplierPayload =
// // //       mapHotelDetailRequest({
// // //         hotelKey,
// // //         searchKey,
// // //       });


// // //     console.log(
// // //       "=========================================="
// // //     );

// // //     console.log(
// // //       "HOTEL DETAIL SUPPLIER PAYLOAD"
// // //     );

// // //     console.log(
// // //       supplierPayload
// // //     );

// // //     console.log(
// // //       "=========================================="
// // //     );


// // //     // ========================================================
// // //     // 7. CALL FLYSHOP
// // //     // ========================================================

// // //     const supplierResponse =
// // //       await getHotelDetailAPI(
// // //         supplierPayload
// // //       );


// // //     // ========================================================
// // //     // 8. MAP SUPPLIER RESPONSE
// // //     // ========================================================

// // //     const mappedResponse =
// // //       mapHotelDetailResponse(
// // //         supplierResponse
// // //       );


// // //     // ========================================================
// // //     // 9. FINAL RESPONSE
// // //     // ========================================================

// // //     return {

// // //       hotelDetailId,

// // //       hotelId,

// // //       hotel: {
// // //         ...hotel.toObject?.() || hotel,
// // //       },

// // //       detail:
// // //         mappedResponse,

// // //       supplier:
// // //         "flyshop",
// // //     };

// // //   } catch (error) {

// // //     console.error(
// // //       "=========================================="
// // //     );

// // //     console.error(
// // //       "HOTEL DETAIL SERVICE ERROR"
// // //     );

// // //     console.error(
// // //       "Message:",
// // //       error?.message
// // //     );

// // //     console.error(
// // //       "Stack:",
// // //       error?.stack
// // //     );

// // //     console.error(
// // //       "=========================================="
// // //     );

// // //     throw error;
// // //   }
// // // };
// // import HotelSearch from "../hotelSearch/hotelSearch.model.js";

// // import {
// //   getHotelDetailAPI,
// // } from "./adapters/hotelDetail.api.js";

// // import {
// //   mapHotelDetailRequest,
// // } from "./adapters/hotelDetail.request.mapper.js";

// // import {
// //   mapHotelDetailResponse,
// // } from "./adapters/hotelDetail.response.mapper.js";


// // // ============================================================
// // // HOTEL DETAIL SERVICE
// // // ============================================================

// // export const getHotelDetailService = async ({
// //   hotelDetailId,
// //   hotelId,
// // }) => {
// //   try {

// //     // ========================================================
// //     // 1. VALIDATION
// //     // ========================================================

// //     if (!hotelDetailId) {
// //       throw new Error("hotelDetailId is required");
// //     }

// //     if (!hotelId) {
// //       throw new Error("hotelId is required");
// //     }


// //     // ========================================================
// //     // 2. FIND HOTEL SEARCH
// //     // ========================================================

// //     const hotelSearch = await HotelSearch.findOne({
// //       hotelDetailId,
// //     }).lean();

// //     if (!hotelSearch) {
// //       throw new Error("Hotel search not found");
// //     }


// //     // ========================================================
// //     // 3. FIND SELECTED HOTEL
// //     // ========================================================

// //     const hotel = hotelSearch.hotels?.find(
// //       (item) =>
// //         String(item.hotelId) === String(hotelId)
// //     );

// //     if (!hotel) {
// //       throw new Error(
// //         "Hotel not found for given hotelDetailId and hotelId"
// //       );
// //     }


// //     // ========================================================
// //     // 4. GET SUPPLIER KEYS
// //     // ========================================================

// //     const {
// //       hotelKey,
// //     } = hotel;

// //     const {
// //       searchKey,
// //     } = hotelSearch;

// //     if (!hotelKey) {
// //       throw new Error(
// //         "HotelKey not found for selected hotel"
// //       );
// //     }

// //     if (!searchKey) {
// //       throw new Error(
// //         "SearchKey not found for hotel search"
// //       );
// //     }


// //     // ========================================================
// //     // 5. CREATE SUPPLIER PAYLOAD
// //     // ========================================================

// //     const supplierPayload = mapHotelDetailRequest({
// //       hotelKey,
// //       searchKey,
// //     });


// //     // ========================================================
// //     // 6. CALL SUPPLIER
// //     // ========================================================

// //     const supplierResponse =
// //       await getHotelDetailAPI(
// //         supplierPayload
// //       );


// //     // ========================================================
// //     // 7. MAP SUPPLIER RESPONSE
// //     // ========================================================

// //     const hotelDetail =
// //       mapHotelDetailResponse(
// //         supplierResponse
// //       );


// //     // ========================================================
// //     // 8. REMOVE INTERNAL FIELDS
// //     // ========================================================

// //     const {
// //       hotelKey: _hotelKey,
// //       hotelId: _hotelId,
// //       ...hotelData
// //     } = hotel;


// //     // ========================================================
// //     // 9. FINAL DATA
// //     // ========================================================

// //     return {
// //       ...hotelData,
// //       ...hotelDetail,
// //     };

// //   } catch (error) {

// //     console.error(
// //       "===================================="
// //     );

// //     console.error(
// //       "HOTEL DETAIL SERVICE ERROR"
// //     );

// //     console.error(
// //       "Message:",
// //       error?.message
// //     );

// //     console.error(
// //       "Stack:",
// //       error?.stack
// //     );

// //     console.error(
// //       "===================================="
// //     );

// //     throw error;
// //   }
// // };


// import HotelSearch from "../hotelSearch/hotelSearch.model.js";

// import {
//   getHotelDetailAPI,
// } from "./adapters/hotelDetail.api.js";

// import {
//   mapHotelDetailRequest,
// } from "./adapters/hotelDetail.request.mapper.js";

// import {
//   mapHotelDetailResponse,
// } from "./adapters/hotelDetail.response.mapper.js";



// // ============================================================
// // HOTEL DETAIL SERVICE
// // ============================================================

// export const getHotelDetailService = async ({
//   hotelDetailId,
//   hotelId,
// }) => {

//   // ==========================================================
//   // 1. VALIDATION
//   // ==========================================================

//   if (!hotelDetailId) {
//     throw new Error("hotelDetailId is required");
//   }

//   if (!hotelId) {
//     throw new Error("hotelId is required");
//   }


//   // ==========================================================
//   // 2. FIND HOTEL SEARCH
//   // ==========================================================

//   const hotelSearch =
//     await HotelSearch.findOne({
//       hotelDetailId,
//     }).lean();


//   if (!hotelSearch) {
//     throw new Error("Hotel search not found");
//   }


//   // ==========================================================
//   // 3. FIND SELECTED HOTEL
//   // ==========================================================

//   const hotel =
//     hotelSearch.hotels?.find(
//       (item) =>
//         String(item.hotelId) ===
//         String(hotelId)
//     );


//   if (!hotel) {
//     throw new Error(
//       "Hotel not found for given hotelDetailId and hotelId"
//     );
//   }


//   // ==========================================================
//   // 4. HOTEL KEY
//   // ==========================================================

//   const hotelKey =
//     hotel.hotelKey;


//   if (!hotelKey) {
//     throw new Error(
//       "HotelKey not found for selected hotel"
//     );
//   }


//   // ==========================================================
//   // 5. SEARCH KEY
//   // ==========================================================

//   const searchKey =
//     hotelSearch.searchKey;


//   if (!searchKey) {
//     throw new Error(
//       "SearchKey not found for hotel search"
//     );
//   }


//   // ==========================================================
//   // 6. SUPPLIER REQUEST
//   // ==========================================================

//   const supplierPayload =
//     mapHotelDetailRequest({
//       hotelKey,
//       searchKey,
//     });


//   // ==========================================================
//   // 7. SUPPLIER API
//   // ==========================================================

//   const supplierResponse =
//     await getHotelDetailAPI(
//       supplierPayload
//     );


//   // ==========================================================
//   // 8. MAP SUPPLIER RESPONSE
//   // ==========================================================

//   const mappedResponse =
//     mapHotelDetailResponse(
//       supplierResponse
//     );


//   // ==========================================================
//   // 9. FINAL SERVICE RESPONSE
//   // ==========================================================
//   // IMPORTANT:
//   // Do NOT return supplierResponse directly.
//   // Do NOT repeat hotelId / hotelKey / supplier here.

//   return {
//     hotel: {
//       ...hotel,
//     },

//     details:
//       mappedResponse.details,
//   };
// };

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