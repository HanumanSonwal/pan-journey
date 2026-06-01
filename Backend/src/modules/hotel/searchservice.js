

import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import { filterHotels } from "./hotel.filters.js";
import { sortHotels } from "./hotel.sort.js";
import HotelCache from "./hotelCache.model.js";
import { paginateHotels } from "./hotelPagination.js";
import { fetchRemainingHotelsInBackground } from "./supplierPagination.service.js";
import { getCurrencyRate }
from "../currencyConverter/currency.service.js";
import { getMarkup } from "../priceMarkup/markup/markup.service.js";
import { applyMarkup } from "../priceMarkup/markup/pricing.service.js";

import { convertHotelPrices , getCurrencySymbol}
from "../currencyConverter/currency.helper.js";

/* =====================================================
   🧠 HELPERS
===================================================== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* =====================================================
   🧠 NORMALIZE BODY
===================================================== */
export const normalizeBody = (body) => ({
  cityId: body.cityId || body.id,

  cityName: body.cityName || body.fullName,

  CheckInDate: body.CheckInDate,

  CheckOutDate: body.CheckOutDate,

  RoomCount: body.RoomCount || 1,

  currency: body.currency || "INR",

  filters: body.filters || {},

  sort: body.sort || "",

  pagination: body.pagination || {
    page: 1,
    limit: 10,
  },
});

/* =====================================================
   📤 BUILD PAYLOAD
===================================================== */
export const buildPayload = (
  body,
  seedValue = "",
  authHeader
) => ({

  AuthHeader: authHeader,

  HotelSeedValue: seedValue,

  CheckInDate: body?.CheckInDate,

  CheckOutDate: body?.CheckOutDate,

  HotelRoomDetail: [
    {
      AdultCount: 1,
      ChildCount: 0,
      Child1Age: 0,
      Child2Age: 0,
    },
  ],

  fullName: body?.cityName,

  id: body?.cityId,

  RoomCount: body?.RoomCount,
});

/* =====================================================
   🏨 MERGE HOTEL + PRICE
===================================================== */
export const mergeHotels = (data) => {

  if (!data?.HotelContents) {
    return [];
  }

  const fares = data?.HotelFareDetails || [];

  return data.HotelContents.map((hotel) => {

    const price = fares.find(
      (f) => f.HotelId === hotel.HotelId
    );

    return {
      hotelId: hotel.HotelId,

      hotelName: hotel.HotelName,

      address: hotel.Address,

      location: hotel.Location,

      starRating: hotel.StarCategoryId,

      latitude: hotel.Latitude,

      longitude: hotel.Longitude,

      hotelkey: hotel.HotelKey,

      image: hotel.HotelImage,

      facilities:
        hotel?.HotelFacilities?.map(
          (f) => f.FacilityName
        ) || [],

      price: price?.BasicAmount || 0,

      tax: price?.TaxAmount || 0,

      freeCancellation:
        price?.FreeCancellation === "2",
    };
  });
};

/* =====================================================
   🚀 SUPPLIER SEARCH WITH RETRY
===================================================== */
const fetchSupplierHotelsWithRetry = async (body) => {

  const auth = getAuthHeader().AuthHeader;

  let payload = buildPayload(
    body,
    "",
    auth
  );

  let attempts = 0;

  let data = null;

  while (attempts < 5) {

    attempts++;

    console.log(`\n🚀 SUPPLIER ATTEMPT #${attempts}`);

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload
    );

    data = response.data;

    console.log(
      "🏨 HOTELS RECEIVED:",
      data?.HotelContents?.length || 0
    );

    console.log(
      "📦 MORE HOTELS:",
      data?.MoreHotels
    );

    console.log(
      "🌱 SEED:",
      data?.HotelSeedValue
    );

    if (
      data?.HotelContents &&
      data.HotelContents.length > 0
    ) {

      return {
        data,
        auth,
      };
    }

    await sleep(1000);

    payload = buildPayload(
      body,
      data?.HotelSeedValue || "",
      auth
    );
  }

  return {
    data,
    auth,
  };
};

/* =====================================================
   🏨 MAIN SEARCH SERVICE
===================================================== */
export const searchHotelsFromSupplier = async (
  reqBody
) => {

  const body = normalizeBody(reqBody);

  const {
    filters,
    sort,
    pagination,
  } = body;

  console.log("\n=================================================");
  console.log("🏨 HOTEL SEARCH STARTED");
  console.log("🏙 CITY:", body.cityName);
  console.log("=================================================\n");

  let cache = await HotelCache.findOne({
    cityId: body.cityId,
  });

  /* =====================================================
     ⚡ CACHE HIT
  ===================================================== */
  if (cache) {

    console.log("⚡ CACHE HIT");

    console.log(
      "🏨 CACHED HOTELS:",
      cache.hotels?.length || 0
    );
  }

  /* =====================================================
     🌐 CACHE MISS
  ===================================================== */
  if (!cache) {

    console.log(
      "🌐 CACHE MISS → CALLING SUPPLIER"
    );

    const {
      data,
      auth,
    } = await fetchSupplierHotelsWithRetry(body);

    console.log(
      "\n================ SUPPLIER RESPONSE ================"
    );

    console.log(JSON.stringify(data, null, 2));

    console.log(
      "===================================================\n"
    );

    const hotels = mergeHotels(data);

    console.log(
      "📦 FIRST PAGE HOTELS:",
      hotels.length
    );

    if (!hotels || hotels.length === 0) {

      throw new Error(
        "No hotels received from supplier"
      );
    }

   
    cache = await HotelCache.findOneAndUpdate(
  {
    cityId: body.cityId,
  },
  {
    $setOnInsert: {
      cityId: body.cityId,
      cityName: body.cityName,
      searchKey: data?.SearchKey,
      isComplete: false,
      hotels,
    },
  },
  {
    new: true,
    upsert: true,
  }
);

    console.log("💾 CACHE SAVED");

    /* =====================================================
       🚀 BACKGROUND PAGINATION
    ===================================================== */
    if (
      data?.MoreHotels ||
      data?.HotelSeedValue
    ) {

      console.log(
        "🚀 STARTING BACKGROUND PAGINATION"
      );

      fetchRemainingHotelsInBackground(
        body,
        data,
        auth
      );
    }
  }

  /* =====================================================
     🔍 FILTER → SORT → PAGINATION
  ===================================================== */
  let hotelsData = cache.hotels || [];
  
  const rate = await getCurrencyRate({
  from: "INR",
  to: body.currency,
});
console.log("\n💰 AFTER CURRENCY CONVERSION");
console.log({
  hotelId: hotelsData?.[0]?.hotelId,
  hotelName: hotelsData?.[0]?.hotelName,
  originalPrice: hotelsData?.[0]?.originalPrice,
  convertedPrice: hotelsData?.[0]?.price,
  originalTax: hotelsData?.[0]?.originalTax,
  convertedTax: hotelsData?.[0]?.tax,
  currency: body.currency,
  rate,
});

hotelsData = convertHotelPrices({
  hotels: hotelsData,
  rate,
  currency: body.currency,
});
const markupResult = await getMarkup({
  cityName: body.cityName,
  stateName: body.stateName,
  countryCode: body.countryCode,
});
console.log("\n🏷️ MARKUP RESULT");
console.log(JSON.stringify(markupResult, null, 2));
const markup = markupResult?.markup;
const serviceTax = markupResult?.serviceTax;

if (markup) {
    console.log("\n🏷️ BEFORE MARKUP");
  console.log({
    hotelId: hotelsData?.[0]?.hotelId,
    hotelName: hotelsData?.[0]?.hotelName,
    price: hotelsData?.[0]?.price,
    tax: hotelsData?.[0]?.tax,
  });

  hotelsData = hotelsData.map((hotel) =>
    applyMarkup(hotel, markup)
  );
   console.log("\n🏷️ AFTER MARKUP");
  console.log({
    hotelId: hotelsData?.[0]?.hotelId,
    hotelName: hotelsData?.[0]?.hotelName,
    supplierPrice: hotelsData?.[0]?.supplierPrice,
    finalPrice: hotelsData?.[0]?.price,
    supplierTax: hotelsData?.[0]?.supplierTax,
    finalTax: hotelsData?.[0]?.tax,
  });
}
hotelsData = hotelsData.map((hotel) => ({
  ...hotel,
  price: (hotel.price || 0) * body.RoomCount,
  tax: (hotel.tax || 0) * body.RoomCount,
}));
console.log("\n🛏️ AFTER ROOM MULTIPLIER");
console.log({
  roomCount: body.RoomCount,
  hotelId: hotelsData?.[0]?.hotelId,
  hotelName: hotelsData?.[0]?.hotelName,
  finalPrice: hotelsData?.[0]?.price,
  finalTax: hotelsData?.[0]?.tax,
});
  console.log("\n🔍 PIPELINE START");

  console.log(
    "📦 INPUT HOTELS:",
    hotelsData.length
  );

  const filtered = filterHotels(
    hotelsData,
    filters
  );

  console.log(
    "🎯 AFTER FILTER:",
    filtered.length
  );

  const sorted = sortHotels(
    filtered,
    sort
  );

  console.log(
    "📊 AFTER SORT:",
    sorted.length
  );

  const page =
    Number(pagination?.page) || 1;

  const limit =
    Number(pagination?.limit) || 10;

  const paginated = paginateHotels(
    sorted,
    {
      page,
      limit,
    }
  );

  console.log(
    "📄 PAGE:",
    page,
    "| LIMIT:",
    limit
  );

  console.log(
    "📦 RETURNED HOTELS:",
    paginated.hotels.length
  );

  console.log(
    "=================================================\n"
  );

 return {
  currency: body.currency,

  currencySymbol:
    getCurrencySymbol(body.currency),
      markupApplied: markup
    ? {
        level: markup.level,
        type: markup.type,
        value: markup.value,
      }
    : null,

  searchKey: cache.searchKey,

  totalHotels:
    paginated.totalHotels,

  page: paginated.page,

  totalPage:
    paginated.totalPages,

  limit: paginated.limit,

  hotels: paginated.hotels,

  isComplete:
    cache.isComplete,
};
};