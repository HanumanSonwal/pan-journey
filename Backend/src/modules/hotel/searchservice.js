


import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import { getCurrencyRate } from "../currencyConverter/currency.service.js";
import { getMarkup } from "../priceMarkup/markup/markup.service.js";
import Markup  from "../priceMarkup/markup/markup.model.js";
import { applyHotelPricing } from "../priceMarkup/markup/pricing.service.js";
import { filterHotels } from "./hotel.filters.js";
import { sortHotels } from "./hotel.sort.js";
import HotelCache from "./hotelCache.model.js";
import { paginateHotels } from "./hotelPagination.js";
import { fetchRemainingHotelsInBackground } from "./supplierPagination.service.js";
import getCountryTaxRule from "./../tax/countryTax.service.js";

import {
  convertHotelPrices,
  getCurrencySymbol,
} from "../currencyConverter/currency.helper.js";

/* =====================================================
   🧠 HELPERS
===================================================== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normalizeCityName = (input) => {
  if (!input) return "";

  const parts = input
    .split(",")
    .map((p) => p.trim());

  // city search format
  if (parts.length === 3) {
    return input.trim();
  }

  // hotel search format
  if (parts.length >= 4) {
    // remove hotel name
    return `${parts[1]}, ${parts[2]}, ${parts[3]}`;
  }

  return input.trim();
};
/* =====================================================
   🧠 NORMALIZE BODY
===================================================== */
export const normalizeBody = (body) => ({
  cityId: body.cityId || body.id,

  cityName: body.cityName || body.fullName,

  CheckInDate: body.CheckInDate,

  CheckOutDate: body.CheckOutDate,

  stateName: body.stateName,
  countryCode: body.countryCode,

  RoomCount: body.RoomCount || 1,

  currency: body.currency || "INR",

  filters: body.filters || {},

  sort: body.sort || "",

  pagination: body.pagination || {
    page: 1,
    limit: 10,
  },
  
});

const resolveMarkupForHotel = ({
  hotel,
  body,
  hotelMarkups,
  cityMarkups,
  stateMarkups,
  countryMarkups,
  worldwideMarkups
}) => {
  // 1 HOTEL LEVEL
  const hotelMarkup = hotelMarkups.find(
    (m) => String(m.hotelId) === String(hotel.hotelId)
  );

  if (hotelMarkup) return hotelMarkup;

  // 2 CITY LEVEL
 const normalizedCity = normalizeCityName(body.cityName);

const cityMarkup = cityMarkups.find(
  (m) =>
    m.cityName?.trim().toLowerCase() ===
    normalizedCity.toLowerCase()
);

  if (cityMarkup) return cityMarkup;



  // 3 STATE LEVEL
  const stateMarkup = stateMarkups.find(
    (m) =>
      m.stateName?.trim().toLowerCase() ===
      body.stateName?.trim().toLowerCase()
  );

  if (stateMarkup) return stateMarkup;

  // 4 COUNTRY LEVEL
  const countryMarkup = countryMarkups.find(
    (m) =>
      m.countryCode?.trim().toUpperCase() ===
      body.countryCode?.trim().toUpperCase()
  );

  if (countryMarkup) return countryMarkup;
    const worldwideMarkup = worldwideMarkups.find((m) => m.level === "worldwide");
   if (worldwideMarkup) return worldwideMarkup;

  return null;
};
/* =====================================================
   📤 BUILD PAYLOAD
===================================================== */
export const buildPayload = (body, seedValue = "", authHeader) => ({
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
    const price = fares.find((f) => f.HotelId === hotel.HotelId);

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

      // IMPORTANT CHANGE
      price: price?.TotalAmount || 0,
      tax: 0,

      supplierBaseAmount:
        price?.BasicAmount || 0,

      supplierTaxAmount:
        price?.TaxAmount || 0,

      supplierTotalAmount:
        price?.TotalAmount || 0,

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

  let payload = buildPayload(body, "", auth);

  let attempts = 0;

  let data = null;

  while (attempts < 5) {
    attempts++;

    console.log(`\n🚀 SUPPLIER ATTEMPT #${attempts}`);

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload,
    );

    data = response.data;

    console.log("🏨 HOTELS RECEIVED:", data?.HotelContents?.length || 0);

    console.log("📦 MORE HOTELS:", data?.MoreHotels);

    console.log("🌱 SEED:", data?.HotelSeedValue);

    if (data?.HotelContents && data.HotelContents.length > 0) {
      return {
        data,
        auth,
      };
    }

    await sleep(1000);

    payload = buildPayload(body, data?.HotelSeedValue || "", auth);
  }

  return {
    data,
    auth,
  };
};

/* =====================================================
   🏨 MAIN SEARCH SERVICE
===================================================== */
export const searchHotelsFromSupplier = async (reqBody) => {
  const body = normalizeBody(reqBody);

  const { filters, sort, pagination } = body;

  console.log("\n=================================================");
  console.log("🏨 HOTEL SEARCH STARTED");
  console.log("🏙 CITY:", body.cityName);
  console.log("=================================================\n");

  // let cache = await HotelCache.findOne({
  //   cityId: body.cityId,
  // });

  let cache = await HotelCache.findOne({
    cityId: body.cityId,
    checkInDate: body.CheckInDate,
    checkOutDate: body.CheckOutDate,
    roomCount: body.RoomCount,
  });

  /* =====================================================
     ⚡ CACHE HIT
  ===================================================== */
  if (cache) {
    console.log("⚡ CACHE HIT");

    console.log("🏨 CACHED HOTELS:", cache.hotels?.length || 0);
  }

  /* =====================================================
     🌐 CACHE MISS
  ===================================================== */
  if (!cache) {
    console.log("🌐 CACHE MISS → CALLING SUPPLIER");

    const { data, auth } = await fetchSupplierHotelsWithRetry(body);

    console.log("\n================ SUPPLIER RESPONSE ================");

    console.log(JSON.stringify(data, null, 2));

    console.log("===================================================\n");

    const hotels = mergeHotels(data);

    console.log("📦 FIRST PAGE HOTELS:", hotels.length);

    if (!hotels || hotels.length === 0) {
      throw new Error("No hotels received from supplier");
    }

    cache = await HotelCache.findOneAndUpdate(
      {
        cityId: body.cityId,
        checkInDate: body.CheckInDate,
        checkOutDate: body.CheckOutDate,
        roomCount: body.RoomCount,
      },
      {
        $setOnInsert: {
          cityId: body.cityId,
          cityName: body.cityName,
          checkInDate: body.CheckInDate,
          checkOutDate: body.CheckOutDate,
          roomCount: body.RoomCount,
          searchKey: data?.SearchKey,
          isComplete: false,
          hotels,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );


    /* =====================================================
       🚀 BACKGROUND PAGINATION
    ===================================================== */
    if (data?.MoreHotels || data?.HotelSeedValue) {
      console.log("🚀 STARTING BACKGROUND PAGINATION");

      fetchRemainingHotelsInBackground(body, data, auth);
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
  // fetch all markups once
const allMarkups = await Markup.find({
  isActive: true,
}).lean();

const hotelMarkups = allMarkups.filter(
  (m) => m.level === "hotel"
);

const cityMarkups = allMarkups.filter(
  (m) => m.level === "city"
);
console.log("COUNTRY TAX FETCHED =>", cityMarkups);

const stateMarkups = allMarkups.filter(
  (m) => m.level === "state"
);

const countryMarkups = allMarkups.filter(
  (m) => m.level === "country"
);



const additionalTax = allMarkups.find(
  (m) => m.level === "additional_tax"
);

const countryTax = await getCountryTaxRule({
  countryCode: body.countryCode,
});
  
const worldwideMarkups = allMarkups.filter(
  (m) => m.level === "worldwide"
);

console.log("WORLDWIDE =", worldwideMarkups);
const pricedHotels = [];

for (const hotel of hotelsData) {
  const matchedMarkup = resolveMarkupForHotel({
    hotel,
    body,
    hotelMarkups,
    cityMarkups,
    stateMarkups,
    countryMarkups,
    worldwideMarkups
 
  });

  const pricedHotel =  applyHotelPricing({
    hotel,
    markup: matchedMarkup,
  
    countryCode: body.countryCode,
      additionalTax,
    countryTax,
  });

  pricedHotels.push({
    ...pricedHotel,

    appliedMarkup: matchedMarkup
      ? {
          level: matchedMarkup.level,
          value: matchedMarkup.markupValue,
        }
      : null,
  });
}

hotelsData = pricedHotels;
  console.log("\n🛏️ AFTER ROOM MULTIPLIER");
  console.log({
    roomCount: body.RoomCount,
    hotelId: hotelsData?.[0]?.hotelId,
    hotelName: hotelsData?.[0]?.hotelName,
    finalPrice: hotelsData?.[0]?.price,
    finalTax: hotelsData?.[0]?.tax,
  });
  console.log("\n🔍 PIPELINE START");

  console.log("📦 INPUT HOTELS:", hotelsData.length);

  const filtered = filterHotels(hotelsData, filters);

  console.log("🎯 AFTER FILTER:", filtered.length);

  const sorted = sortHotels(filtered, sort);



  const page = Number(pagination?.page) || 1;

  const limit = Number(pagination?.limit) || 10;

  const paginated = paginateHotels(sorted, {
    page,
    limit,
  });

  console.log("📄 PAGE:", page, "| LIMIT:", limit);

  console.log("📦 RETURNED HOTELS:", paginated.hotels.length);

  console.log("=================================================\n");
 
  return {
    currency: body.currency,

    currencySymbol: getCurrencySymbol(body.currency),
  

    searchKey: cache.searchKey,

    totalHotels: paginated.totalHotels,

    page: paginated.page,

    totalPage: paginated.totalPages,

    limit: paginated.limit,

    hotels: paginated.hotels,

    isComplete: cache.isComplete,
  };
}
