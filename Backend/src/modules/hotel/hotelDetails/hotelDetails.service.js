import { supplierAPI } from "../../../config/supplierApi.js";
import { getAuthHeader } from "../../../config/supplierAuth.service.js";
import HotelCache from "../hotelCache.model.js";
import { searchHotelsFromSupplier } from "../searchservice.js";

export const fetchHotelDetailsFromSupplier = async ({
  hotelId,
  hotelMeta,
  searchContext,
}) => {
  try {
    let hotel = null;
    let activeCache = null;

    const supplierSearchCityId = `99${hotelId}`;

    console.log("========== HOTEL DETAILS DEBUG START ==========");
    console.log("Incoming hotelId:", hotelId);
    console.log("Incoming hotelMeta:", hotelMeta);
    console.log("Generated supplierSearchCityId:", supplierSearchCityId);
    console.log("Incoming searchContext:", searchContext);

    // STEP 1 → direct hotelId lookup
    console.log("🔍 Looking hotel in cache by hotelId...");

    const cacheLookup = {
      "hotels.hotelId": String(hotelId),
      checkInDate: searchContext.CheckInDate,
      checkOutDate: searchContext.CheckOutDate,
      roomCount: Number(searchContext.RoomCount || 1),
    };

    console.log("🔍 Looking hotel in cache:", cacheLookup);

    activeCache = await HotelCache.findOne(cacheLookup);
    console.log("📦 CACHE FOUND:", !!activeCache);

    // STEP 2 → if cache found, find hotel
    if (activeCache) {
      hotel = activeCache.hotels.find((h) => h.hotelId === String(hotelId));

      console.log("🏨 Hotel found inside cache:", !!hotel);
    }

    // STEP 3 → fallback search
    if (!activeCache || !hotel) {
      console.log("⚠️ Cache miss → running search fallback");

      const searchPayload = {
        id: supplierSearchCityId, // supplier search cityId
        fullName: searchContext.fullName,
        CheckInDate: searchContext.CheckInDate,
        CheckOutDate: searchContext.CheckOutDate,
        RoomCount: searchContext.RoomCount || 1,
        stateName: hotelMeta.stateName,
        cityName: hotelMeta.cityName,
        countryCode: hotelMeta.countryCode,
        filters: {},
        sort: "",
        pagination: {
          page: 1,
          limit: 10,
        },
      };

      console.log("📤 Search API Payload:", searchPayload);

      await searchHotelsFromSupplier(searchPayload);

      console.log("🔄 Search completed. Re-checking cache...");

      // STEP 4 → refresh cache
      const cacheLookup = {
        cityId: supplierSearchCityId,
        checkInDate: searchContext.CheckInDate,
        checkOutDate: searchContext.CheckOutDate,
        roomCount: searchContext.RoomCount || 1,
      };

      console.log("🔍 Cache Recheck Query:", cacheLookup);

      const caches = await HotelCache.find(cacheLookup);

      console.log("Total matched:", caches.length);

      activeCache = caches[0];

      if (!activeCache) {
        throw new Error("Search ran but cache not created");
      }
      // STEP 5 → find hotel again
      hotel = activeCache.hotels.find((h) => h.hotelId === String(hotelId));

      if (!hotel) {
        throw new Error("Hotel not found even after cache refresh");
      }
      console.log("✅ Hotel found after fallback search");
    }
    // STEP 6 → supplier keys
    const supplierHotelKey = hotel.hotelkey;
    const searchKey = activeCache.searchKey;

    // STEP 7 → supplier payload
    const payload = {
      ...getAuthHeader(),
      HotelKey: supplierHotelKey,
      SearchKey: searchKey,
    };

    console.log("📤 Supplier Details Payload:", payload);
    // STEP 8 → call supplier details API
    const { data } = await supplierAPI.post(
      "/JSONService/HotelDetails",
      payload,
    );
    console.log("✅ Supplier Details API Success");
    console.log("========== HOTEL DETAILS DEBUG END ==========");

    return {
      success: true,
      hotelId,
      hotelMeta,
      searchKey,
      supplierResponse: data,
    };
  } catch (error) {
    throw new Error(error.message || "Supplier HotelDetails API failed");
  }
};
