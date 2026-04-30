// import HotelSearchCache from "./hotelSearchCache.model.js";
// import { searchHotelsFromSupplier } from "./hotel.supplier.service.js";
// import { createSearchKey } from "../../utils/createSearchKey.js";

// export const searchHotelsService = async (params) => {
//   const searchKey = createSearchKey(params);

//   // 1️⃣ CHECK CACHE FIRST
//   const cached = await HotelSearchCache.findOne({ searchKey });

//   if (cached) {
//     console.log("⚡ CACHE HIT");
//     return cached.supplierResponse;
//   }

//   console.log("🐌 CACHE MISS → calling supplier");

//   // 2️⃣ CALL SUPPLIER
//   const supplierData = await searchHotelsFromSupplier(params);

//   // 3️⃣ SAVE TO CACHE
//   await HotelSearchCache.create({
//     searchKey,
//     ...params,
//     supplierResponse: supplierData
//   });

//   return supplierData;
// };