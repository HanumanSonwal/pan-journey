import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";
import { filterHotels } from "./hotel.filters.js";
import { sortHotels } from "./hotel.sort.js";
import HotelCache from "./hotelCache.model.js";
import { paginateHotels } from "./hotelPagination.js";
import { fetchRemainingHotelsInBackground } from "./supplierPagination.service.js";

/* =====================================================
   🧠 HELPERS
===================================================== */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- NORMALIZE ---------------- */
export const normalizeBody = (body) => ({
    location: {
    country: body.country,
    fullName: body.fullName,
    id: body.id,
    state: body.state,
    type: body.type,
  },
  cityId: body.cityId || body.id,
  cityName: body.cityName || body.fullName,
  CheckInDate: body.CheckInDate,
  CheckOutDate: body.CheckOutDate,
  RoomCount: body.RoomCount || 1,
  filters: body.filters || {},
  sort: body.sort || "",
  pagination: body.pagination || { page: 1, limit: 10 },
});

/* ---------------- PAYLOAD ---------------- */
export const buildPayload = (body, seedValue = "") => ({
  AuthHeader: getAuthHeader().AuthHeader,
  HotelSeedValue: seedValue,
  CheckInDate: body?.CheckInDate,
  CheckOutDate: body?.CheckOutDate,
  HotelRoomDetail: [
    { AdultCount: 1, ChildCount: 0, Child1Age: 0, Child2Age: 0 },
  ],
  fullName: body?.cityName,
  id: body?.cityId,
  RoomCount: body?.RoomCount,
});

/* =====================================================
   🚀 SUPPLIER RETRY SEARCH FLOW (IMPORTANT)
   Supplier first call = Search start
   Second call = Hotels ready
===================================================== */
const fetchSupplierHotelsWithRetry = async (body) => {
  console.log("\n🚀 START SUPPLIER SEARCH FLOW");

  let payload = buildPayload(body);
  let data;
  let attempts = 0;

  while (attempts < 5) {
    attempts++;

    console.log(`\n🌐 SUPPLIER CALL ATTEMPT #${attempts}`);
    console.log("📤 PAYLOAD:", JSON.stringify(payload, null, 2));

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload,
    );

    data = response.data;

    console.log("🏨 Hotels:", data?.HotelContents?.length || 0);
    console.log("📦 MoreHotels:", data?.MoreHotels);

    // ⭐ SUCCESS CONDITION → hotels mil gaye
    if (data?.HotelContents && data.HotelContents.length > 0) {
      console.log("🎉 HOTELS RECEIVED FROM SUPPLIER");
      return data;
    }

    // ⭐ Supplier processing → wait & retry
    console.log("⏳ Supplier still preparing hotels… waiting 4 sec");
    await sleep(4000);

    // ⭐ next call me SearchKey bhejna mandatory
    payload.HotelSeedValue = data.HotelSeedValue;
  }

  return data; // fallback
};

/* ---------------- MERGE HOTEL + FARE ---------------- */
export const mergeHotels = (data) => {
  if (!data?.HotelContents) return [];

  const fares = data?.HotelFareDetails || [];

  return data.HotelContents.map((h) => {
    const price = fares.find((f) => f.HotelId === h.HotelId);

    return {
      hotelId: h.HotelId,
      hotelName: h.HotelName,
      address: h.Address,
      location: h.Location,
      starRating: h.StarCategoryId,
      latitude: h.Latitude,
      longitude: h.Longitude,
      hotelkey: h.HotelKey,
      image: h.HotelImage,
      facilities: h.HotelFacilities?.map((f) => f.FacilityName) || [],
      price: price?.TotalAmount || 0,
      tax: price?.TaxAmount || 0,
      freeCancellation: price?.FreeCancellation === "2",
    };
  });
};

/* =====================================================
   🏨 MAIN HOTEL SEARCH SERVICE
===================================================== */
export const searchHotelsFromSupplier = async (reqBody) => {
  const body = normalizeBody(reqBody);
  const { filters, sort, pagination } = body;

  console.log("\n=================================================");
  console.log("🏨 HOTEL SEARCH INITIATED");
  console.log("🏙 City:", body.cityName, "|", body.cityId);
  console.log(
    "📅 CheckIn:",
    body.CheckInDate,
    "| CheckOut:",
    body.CheckOutDate,
  );
  console.log("=================================================\n");

  let cache = await HotelCache.findOne({ cityId: body.cityId });

  /* =====================================================
     ⚡ CACHE HIT
  ===================================================== */
  if (cache) {
    console.log("⚡ CACHE HIT");
    console.log("🏨 Cached Hotels Count:", cache.hotels?.length || 0);
  }

  /* =====================================================
     🌐 CACHE MISS → SUPPLIER CALL WITH RETRY
  ===================================================== */
  if (!cache) {
    console.log("🌐 CACHE MISS → CALLING SUPPLIER API");

    const data = await fetchSupplierHotelsWithRetry(body);

    console.log("\n================ SUPPLIER FINAL RESPONSE ================");
    console.log(JSON.stringify(data, null, 2));
    console.log("=======================================================\n");

    const hotels = mergeHotels(data);
    console.log("📦 FIRST PAGE HOTELS RECEIVED:", hotels.length);
    if (!hotels || hotels.length === 0) {
      console.log("❌ SUPPLIER RETURNED 0 HOTELS → NOT CACHING");
      throw new Error("No hotels received from supplier. Try again.");
    }

    cache = await HotelCache.create({
    location: body.location,
      cityId: body.cityId,
      cityName: body.cityName,
      hotels,
    });
    // cache = await HotelCache.create({
    //   cityId: body.cityId,
    //   cityName: body.cityName,
    //   hotels,
    // });

    console.log("💾 CACHE CREATED SUCCESSFULLY");

    // 🚀 background pagination
    if (data?.MoreHotels || data?.HotelSeedValue) {
      console.log("🚀 TRIGGERING BACKGROUND PAGINATION");
      fetchRemainingHotelsInBackground(body, data);
    }
  }

  /* =====================================================
     🔍 FILTER → SORT → PAGINATION PIPELINE
  ===================================================== */
  let hotelsData = cache.hotels || [];

  console.log("\n🔍 PIPELINE START");
  console.log("📦 Input Hotels:", hotelsData.length);

  const filtered = filterHotels(hotelsData, filters);
  console.log("🎯 After Filter:", filtered.length);

  const sorted = sortHotels(filtered, sort);
  console.log("📊 After Sort:", sorted.length);

  const page = Number(pagination.page) || 1;
  const limit = Number(pagination.limit) || 10;

  // const page = pagination.page || 1;
  // const limit = pagination.limit || 10;

  const paginated = paginateHotels(sorted, { page, limit });

  console.log("📄 Page:", page, "| Limit:", limit);
  console.log("📦 Returned Hotels:", paginated.length);
  console.log("=================================================\n");

  return {
      location: cache.location,
    totalHotels: paginated.totalHotels,
    page: paginated.page,
    totalPage: paginated.totalPages,
    limit: paginated.limit,
    hotels: paginated.hotels,
    isComplete: cache.isComplete,
  };
};
