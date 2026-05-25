// import { supplierAPI } from "../../../config/supplierApi.js";
// import { getAuthHeader } from "../../../config/supplierAuth.service.js";

// export const fetchHotelDetailsFromSupplier = async ({ hotelKey, searchKey }) => {
//   try {
//     const payload = {
//       ...getAuthHeader(),
//       HotelKey: hotelKey,
//       SearchKey: searchKey,
//     };

//     const { data } = await supplierAPI.post(
//       "/JSONService/HotelDetails",
//       payload
//     );

//     return data;
//   } catch (error) {
//     console.error("Supplier Hotel Detail Error:", error?.response?.data || error.message);
//     throw new Error("Supplier HotelDetails API failed");
//   }
// };

import { supplierAPI } from "../../../config/supplierApi.js";
import { getAuthHeader } from "../../../config/supplierAuth.service.js";
import HotelCache from "../hotelCache.model.js";

export const fetchHotelDetailsFromSupplier = async ({
  hotelId,
  hotelMeta,
}) => {
  try {

    // 1️⃣ Find cache using hotelKeys only
    const hotelCache = await HotelCache.findOne({
      "hotels.hotelId": hotelId,
      isComplete: true,
    });

    if (!hotelCache) {
      throw new Error("Hotel cache not found");
    }

    // 2️⃣ Find hotel inside hotels array
    const hotel = hotelCache.hotels.find(
      (h) => h.hotelId === hotelId
    );

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
      payload
    );

    return {
      success: true,
      hotelId,
      hotelMeta,
      supplierResponse: data,
    };

  } catch (error) {

    console.error(
      "Supplier Hotel Detail Error:",
      error?.response?.data || error.message
    );

    throw new Error(
      error.message || "Supplier HotelDetails API failed"
    );
  }
};