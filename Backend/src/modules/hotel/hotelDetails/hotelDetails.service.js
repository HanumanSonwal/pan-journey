import { supplierAPI } from "../../../config/supplierApi.js";
import { getAuthHeader } from "../../../config/supplierAuth.service.js";
import HotelCache from "../hotelCache.model.js";

export const fetchHotelDetailsFromSupplier = async ({ hotelId, hotelMeta }) => {
  try {
    // const hotelCache = await HotelCache.findOne({
    //   "hotels.hotelId": String(hotelId),
    //   //isComplete: true,
    // });

    const query = {
      "hotels.hotelId": String(hotelId),
      //isComplete: true,
    };

    console.log("🔥 ACTUAL QUERY:", JSON.stringify(query, null, 2));

    const hotelCache = await HotelCache.findOne(query);

    console.log("📦 CACHE FOUND:", !!hotelCache);

    if (hotelCache) {
      console.log("✅ CACHE isComplete:", hotelCache.isComplete);
      console.log("✅ CACHE cityId:", hotelCache.cityId);
    }
    const sample = await HotelCache.findOne();

    console.log(sample.hotels[1]);
    console.log("HOTEL ID =>", hotelId);
    console.log("TYPE =>", typeof hotelId);
    if (!hotelCache) {
      throw new Error("Hotel not found");
    }

    // 2️⃣ Find hotel inside hotels array
    const hotel = hotelCache.hotels.find((h) => h.hotelId === String(hotelId));

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    // 3️⃣ Extract supplier keys
    const supplierHotelKey = hotel.hotelkey;
    const searchKey = hotelCache.searchKey;

    // 4️⃣ Supplier payload
    const payload = {
      ...getAuthHeader(),
      HotelKey: supplierHotelKey,
      SearchKey: searchKey,
    };

    console.log("📤 Supplier Payload:", payload);

    // 5️⃣ Call supplier API
    const { data } = await supplierAPI.post(
      "/JSONService/HotelDetails",
      payload,
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
      "Supplier Hotel Detail Error:",
      error?.response?.data || error.message,
    );

    throw new Error(error.message || "Supplier HotelDetails API failed");
  }
};
