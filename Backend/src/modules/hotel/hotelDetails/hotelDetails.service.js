// import { supplierAPI } from "../../../config/supplierApi.js";
// import { getAuthHeader } from "../../../config/supplierAuth.service.js";
// import HotelCache from "../hotelCache.model.js";
// import { searchHotelsFromSupplier } from "../searchservice.js";
// export const fetchHotelDetailsFromSupplier = async ({
//   hotelId,
//   hotelMeta,
//   searchContext
// }) => {
//   try {
//     // const hotelCache = await HotelCache.findOne({
//     //   "hotels.hotelId": String(hotelId),
//     //   //isComplete: true,
//     // });

//     const query = {
//       "hotels.hotelId": String(hotelId),
//       //isComplete: true,
//     };

//     console.log("🔥 ACTUAL QUERY:", JSON.stringify(query, null, 2));

//     const hotelCache = await HotelCache.findOne(query);

//     console.log("📦 CACHE FOUND:", !!hotelCache);

//     if (hotelCache) {
//       console.log("✅ CACHE isComplete:", hotelCache.isComplete);
//       console.log("✅ CACHE cityId:", hotelCache.cityId);
//     }
//     const sample = await HotelCache.findOne();

//     console.log(sample.hotels[1]);
//     console.log("HOTEL ID =>", hotelId);
//     console.log("TYPE =>", typeof hotelId);
//     if (!hotelCache) {
//       throw new Error("Hotel not found");
//     }

//     // 2️⃣ Find hotel inside hotels array
//     const hotel = hotelCache.hotels.find((h) => h.hotelId === String(hotelId));

//     if (!hotel) {
//   console.log("⚠️ Hotel not found in cache. Refreshing search...");

//   await searchHotelsFromSupplier({
//     id: hotelMeta.cityName,   // tumhare code me cityName actually cityId lag raha hai
//     fullName: searchContext.fullName,
//     CheckInDate: searchContext.CheckInDate,
//     CheckOutDate: searchContext.CheckOutDate,
//     RoomCount: searchContext.RoomCount || 1,
//     stateName: hotelMeta.stateName,
//     countryCode: hotelMeta.countryCode,
//     filters: {},
//     sort: "",
//     pagination: {
//       page: 1,
//       limit: 10,
//     }
//   });

//   // fresh cache read
//   const refreshedCache = await HotelCache.findOne({
//     cityId: hotelMeta.cityName,
//     checkInDate: searchContext.CheckInDate,
//     checkOutDate: searchContext.CheckOutDate,
//     roomCount: searchContext.RoomCount || 1,
//   });

//   if (!refreshedCache) {
//     throw new Error("Hotel not found after cache refresh");
//   }

//   hotel = refreshedCache.hotels.find(
//     (h) => h.hotelId === String(hotelId)
//   );

//   if (!hotel) {
//     throw new Error("Hotel missing even after search refresh");
//   }

//   console.log("✅ Hotel found after cache refresh");
// }

//     // 3️⃣ Extract supplier keys
//     const supplierHotelKey = hotel.hotelkey;
//     const searchKey = hotelCache.searchKey;

//     // 4️⃣ Supplier payload
//     const payload = {
//       ...getAuthHeader(),
//       HotelKey: supplierHotelKey,
//       SearchKey: searchKey,
//     };

//     console.log("📤 Supplier Payload:", payload);

//     // 5️⃣ Call supplier API
//     const { data } = await supplierAPI.post(
//       "/JSONService/HotelDetails",
//       payload,
//     );

//     return {
//       success: true,
//       hotelId,
//       hotelMeta,
//       searchKey,
//       supplierResponse: data,
//     };
//   } catch (error) {
//     console.error(
//       "Supplier Hotel Detail Error:",
//       error?.response?.data || error.message,
//     );

//     throw new Error(error.message || "Supplier HotelDetails API failed");
//   }
// };
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

    console.log("🔍 Looking hotel in cache:", hotelId);

    // STEP 1 → direct hotelId lookup
    activeCache = await HotelCache.findOne({
      "hotels.hotelId": String(hotelId),
    });

    console.log("📦 CACHE FOUND:", !!activeCache);

    // STEP 2 → if cache found, find hotel
    if (activeCache) {
      hotel = activeCache.hotels.find(
        (h) => h.hotelId === String(hotelId)
      );
    }

    // STEP 3 → fallback search if cache miss OR hotel missing
    if (!activeCache || !hotel) {
      console.log("⚠️ Cache miss → running search fallback");

      await searchHotelsFromSupplier({
        id: hotelMeta.cityId,          // IMPORTANT → use cityId not cityName
        fullName: searchContext.fullName,
        CheckInDate: searchContext.CheckInDate,
        CheckOutDate: searchContext.CheckOutDate,
        RoomCount: searchContext.RoomCount || 1,
        stateName: hotelMeta.stateName,
        countryCode: hotelMeta.countryCode,
        filters: {},
        sort: "",
        pagination: {
          page: 1,
          limit: 10,
        },
      });

      console.log("🔄 Search completed. Re-checking cache...");

      // STEP 4 → refresh cache
      activeCache = await HotelCache.findOne({
        cityId: hotelMeta.cityId,
        checkInDate: searchContext.CheckInDate,
        checkOutDate: searchContext.CheckOutDate,
        roomCount: searchContext.RoomCount || 1,
      });

      if (!activeCache) {
        throw new Error("Search ran but cache not created");
      }

      // STEP 5 → find hotel again
      hotel = activeCache.hotels.find(
        (h) => h.hotelId === String(hotelId)
      );

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
      payload
    );

    return {
      success: true,
      hotelId,
      hotelMeta,
      searchKey,
      supplierResponse: data,
    };
  } catch (error) {
    console.error(
      "❌ Supplier Hotel Detail Error:",
      error?.response?.data || error.message
    );

    throw new Error(
      error.message || "Supplier HotelDetails API failed"
    );
  }
};