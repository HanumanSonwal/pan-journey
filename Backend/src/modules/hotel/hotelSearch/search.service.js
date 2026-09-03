
import HotelSearch from "./hotelSearch.model.js";

import {
  searchHotelAPI,
  searchMoreHotelsAPI,
} from "./adapters/flyshop/hotelSearch.api.js";

import {
  mapHotelSearchRequest,
} from "./adapters/flyshop/hotelSearch.request.mapper.js";

import {
  mapHotelSearchResponse,
} from "./adapters/flyshop/hotelSearch.response.mapper.js";

import {
  findHotelSearchCache,
  saveHotelSearch,
  appendHotelSearchHotels,
} from "./hotelSearch.repository.js";

import { queryBuilder } from "../../../utils/queryBuilder.js";


// ============================================================
// RUNNING MORE HOTEL SEARCHES
// ============================================================

const runningMoreHotelSearches = new Set();


// ============================================================
// MAP SUPPLIER HOTEL
// ============================================================

const mapSupplierHotel = (hotel) => ({
  hotelId:
    hotel?.HotelId ||
    null,

  hotelKey:
    hotel?.HotelKey ||
    null,

  name:
    hotel?.HotelName ||
    null,

  description:
    hotel?.HotelDesc ||
    null,

  location: {
    address:
      hotel?.Address ||
      null,

    city:
      hotel?.City ||
      null,

    state:
      hotel?.state ||
      null,

    country:
      hotel?.Country ||
      null,

    pincode:
      hotel?.Pincode ||
      null,

    latitude:
      hotel?.Latitude !== undefined &&
      hotel?.Latitude !== null &&
      hotel?.Latitude !== ""
        ? Number(hotel.Latitude)
        : null,

    longitude:
      hotel?.Longitude !== undefined &&
      hotel?.Longitude !== null &&
      hotel?.Longitude !== ""
        ? Number(hotel.Longitude)
        : null,
  },

  contact: {
    phone:
      hotel?.HotelPhone ||
      null,

    email:
      hotel?.HotelEmail ||
      null,
  },

  starCategory:
    hotel?.StarCategoryId !== undefined &&
    hotel?.StarCategoryId !== null &&
    hotel?.StarCategoryId !== ""
      ? Number(hotel.StarCategoryId)
      : null,

  image:
    hotel?.HotelImage ||
    null,

  facilities: (
    Array.isArray(
      hotel?.HotelFacilities
    )
      ? hotel.HotelFacilities
      : []
  ).map((facility) => ({
    id:
      facility?.FacilityId ||
      null,

    name:
      facility?.FacilityName?.trim() ||
      null,
  })),

  pricing: {
    currency:
      hotel?.Currencycode ||
      null,

    basicAmount:
      Number(
        hotel?.LowestBasicAmount || 0
      ),

    tax:
      Number(
        hotel?.LowestRateTax || 0
      ),

    totalAmount:
      Number(
        hotel?.TotalAmount || 0
      ),

    serviceFee:
      Number(
        hotel?.ServiceFeeAmount || 0
      ),

    markup:
      Number(
        hotel?.TradeMarkupAmount || 0
      ),

    gst:
      Number(
        hotel?.GST || 0
      ),
  },

  checkIn: {
    date:
      hotel?.CheckInDate ||
      null,

    time:
      hotel?.CheckInTime ||
      null,
  },

  checkOut: {
    date:
      hotel?.CheckOutDate ||
      null,

    time:
      hotel?.CheckOutTime ||
      null,
  },

  policy: {
    applicableCode:
      hotel?.ApplicablePolicyCode ||
      null,

    state:
      hotel?.PolicyState ||
      null,

    outPolicyReason:
      hotel?.OutPolicyReason ||
      null,
  },

  supplier: "flyshop",
});


// ============================================================
// MAP SUPPLIER HOTELS
// ============================================================

const mapSupplierHotels = (
  hotels = []
) => {
  if (!Array.isArray(hotels)) {
    return [];
  }

  return hotels.map(
    mapSupplierHotel
  );
};


// ============================================================
// GET HOTELS WITH SEARCH / FILTER / SORT / PAGINATION
// ============================================================

const getHotelSearchResult = async ({
  cacheKey,
  payload,
}) => {

  return queryBuilder({
    model: HotelSearch,

    query: {
      ...payload,
      cacheKey,
    },

    // --------------------------------------------------------
    // ROOT DOCUMENT FILTER
    // --------------------------------------------------------

    filterFields: [
      "cacheKey",
    ],

    // --------------------------------------------------------
    // HOTEL ARRAY
    // --------------------------------------------------------

    arrayField: "hotels",

    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    searchFields: [
      "name",
      "location.city",
      "location.address",
      "location.state",
      "location.pincode",
    ],

    // --------------------------------------------------------
    // FILTER
    // --------------------------------------------------------

    arrayFilterFields: [
      "starCategory",
      "location.city",
    ],

    // --------------------------------------------------------
    // SORT
    // --------------------------------------------------------

    sortFields: [
      "name",
      "location.city",
      "starCategory",
      "pricing.totalAmount",
      "pricing.basicAmount",
      "pricing.tax",
    ],

    // --------------------------------------------------------
    // PAGINATION
    // --------------------------------------------------------

    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  });
};


// ============================================================
// BACKGROUND MORE HOTEL SEARCH
// ============================================================

const fetchAndSaveMoreHotels = async ({
  searchId,
  searchKey,
}) => {

  if (
    runningMoreHotelSearches.has(
      searchId
    )
  ) {
    console.log(
      "HotelSearchMore already running:",
      searchId
    );

    return;
  }

  runningMoreHotelSearches.add(
    searchId
  );

  try {

    console.log(
      "=========================================="
    );

    console.log(
      "Background HotelSearchMore started:",
      searchId
    );

    console.log(
      "=========================================="
    );


    // --------------------------------------------------------
    // CALL SUPPLIER
    // --------------------------------------------------------

    const moreResponse =
      await searchMoreHotelsAPI({
        searchId,
        searchKey,
      });


    // --------------------------------------------------------
    // MAP RESPONSE
    // --------------------------------------------------------

    const moreHotels =
      mapSupplierHotels(
        moreResponse?.HotelDetails || []
      );


    console.log(
      "HotelSearchMore received:",
      moreHotels.length
    );


    // --------------------------------------------------------
    // SAVE MORE HOTELS
    // --------------------------------------------------------

    if (
      moreHotels.length > 0
    ) {

      await appendHotelSearchHotels({
        searchId,

        hotels:
          moreHotels,

        moreHotels:
          moreResponse?.MoreHotels ?? false,
      });

    } else {

      await HotelSearch.updateOne(
        {
          searchId,
        },
        {
          $set: {
            moreHotels:
              moreResponse?.MoreHotels ?? false,
          },
        }
      );
    }


    console.log(
      `${moreHotels.length} more hotels saved for ${searchId}`
    );

    console.log(
      "HotelSearchMore completed:",
      searchId
    );

  } catch (error) {

    console.error(
      "Background HotelSearchMore failed:",
      searchId,
      error?.message || error
    );

  } finally {

    runningMoreHotelSearches.delete(
      searchId
    );
  }
};


// ============================================================
// MAIN HOTEL SEARCH SERVICE
// ============================================================

export const searchHotelService = async (
  payload
) => {

  // ==========================================================
  // 1. MAP REQUEST
  // ==========================================================

  const supplierPayload =
    mapHotelSearchRequest(
      payload
    );


  // ==========================================================
  // 2. CREATE CACHE KEY
  // ==========================================================

  const cacheKey =
    JSON.stringify({
      supplier: "flyshop",

      destination:
        supplierPayload.Origin,

      checkIn:
        payload.checkIn,

      checkOut:
        payload.checkOut,

      rooms:
        payload.rooms,
    });


  console.log(
    "Hotel Cache Key:",
    cacheKey
  );


  // ==========================================================
  // 3. CHECK CACHE
  // ==========================================================

  const cachedSearch =
    await findHotelSearchCache({
      cacheKey,
    });


  // ==========================================================
  // 4. CACHE HIT
  // ==========================================================

  if (cachedSearch) {

    console.log(
      "=========================================="
    );

    console.log(
      "Hotel search cache HIT:",
      cachedSearch.searchId
    );

    console.log(
      "=========================================="
    );


    // --------------------------------------------------------
    // BACKGROUND MORE HOTEL SEARCH
    // --------------------------------------------------------

    if (
      cachedSearch.moreHotels === true
    ) {

      fetchAndSaveMoreHotels({
        searchId:
          cachedSearch.searchId,

        searchKey:
          cachedSearch.searchKey,
      }).catch((error) => {

        console.error(
          "Unhandled HotelSearchMore error:",
          error?.message || error
        );

      });
    }


    // --------------------------------------------------------
    // SEARCH / FILTER / SORT / PAGINATION
    // --------------------------------------------------------

    const result =
      await getHotelSearchResult({
        cacheKey,
        payload,
      });


    console.log(
      "CACHE QUERY RESULT:",
      result.data.length
    );


    // --------------------------------------------------------
    // MAP OLD RESPONSE FORMAT
    // --------------------------------------------------------

    const mappedResult =
      mapHotelSearchResponse({
        hotels:
          result.data,
      });


    console.log(
      "MAPPED CACHE HOTELS:",
      mappedResult?.hotels?.length || 0
    );


    // ========================================================
    // RETURN
    // ========================================================

    return {

      ...mappedResult,

      meta:
        result.meta,

      moreHotels:
        cachedSearch.moreHotels,

      fromCache:
        true,
    };
  }


  // ==========================================================
  // 5. CACHE MISS
  // ==========================================================

  console.log(
    "=========================================="
  );

  console.log(
    "Hotel search cache MISS"
  );

  console.log(
    "Calling Flyshop supplier..."
  );

  console.log(
    "=========================================="
  );


  // ==========================================================
  // 6. CALL SUPPLIER
  // ==========================================================

  const supplierResponse =
    await searchHotelAPI(
      supplierPayload
    );


  // ==========================================================
  // 7. MAP HOTELS
  // ==========================================================

  const hotels =
    mapSupplierHotels(
      supplierResponse?.HotelDetails || []
    );


  console.log(
    "Initial hotels received:",
    hotels.length
  );


  // ==========================================================
  // 8. SAVE COMPLETE HOTEL SEARCH
  // ==========================================================

  const savedSearch =
    await saveHotelSearch({

      cacheKey,

      searchId:
        supplierResponse?.SearchID,

      searchKey:
        supplierResponse?.SearchKey,

      supplier:
        "flyshop",

      destination:
        supplierPayload.Origin,

      checkIn:
        new Date(
          payload.checkIn
        ),

      checkOut:
        new Date(
          payload.checkOut
        ),

      rooms:
        payload.rooms,

      hotels,

      totalHotels:
        hotels.length,

      moreHotels:
        supplierResponse?.MoreHotels || false,

      responseStatus:
        supplierResponse
          ?.Response_Header
          ?.ErrorCode,

      rawResponse:
        supplierResponse,

      expiresAt:
        new Date(
          Date.now() +
          30 * 60 * 1000
        ),
    });


  // ==========================================================
  // 9. START BACKGROUND MORE SEARCH
  // ==========================================================

  if (
    savedSearch.moreHotels === true
  ) {

    fetchAndSaveMoreHotels({
      searchId:
        savedSearch.searchId,

      searchKey:
        savedSearch.searchKey,
    }).catch((error) => {

      console.error(
        "Unhandled HotelSearchMore error:",
        error?.message || error
      );

    });
  }


  // ==========================================================
  // 10. SEARCH / FILTER / SORT / PAGINATION
  // ==========================================================

  const result =
    await getHotelSearchResult({
      cacheKey,
      payload,
    });


  console.log(
    "SAVED QUERY RESULT:",
    result.data.length
  );


  // ==========================================================
  // 11. MAP RESPONSE
  // ==========================================================

  const mappedResult =
    mapHotelSearchResponse({
      hotels:
        result.data,
    });


  console.log(
    "MAPPED HOTELS:",
    mappedResult?.hotels?.length || 0
  );


  // ==========================================================
  // 12. FINAL RESPONSE
  // ==========================================================

  return {

    ...mappedResult,

    meta:
      result.meta,

    moreHotels:
      savedSearch.moreHotels,

    fromCache:
      false,
  };
};