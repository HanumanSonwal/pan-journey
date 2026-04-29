import Hotel from "./hotel.model.js";
import { fetchHotelsByCity } from "../../suppliers/supplier.client.js";
import { mapSupplierHotels } from "../../suppliers/supplier.mapper.js";
import { normalizeCity } from "../../utils/normalize.js";

export const searchHotelsByCity = async (city) => {
  const normalizedCity = normalizeCity(city);

  console.log("🔎 Searching hotels for:", normalizedCity);

  // 1️⃣ Check cache (DB)
  const cachedHotels = await Hotel.find({ city: normalizedCity });

  if (cachedHotels.length > 0) {
    console.log("⚡ Returning hotels from DB cache");
    return cachedHotels;
  }

  console.log("🌐 No cache found → calling supplier");

  // 2️⃣ Fetch from supplier
  const supplierData = await fetchHotelsByCity(normalizedCity);

  // 3️⃣ Map supplier response → our DB format
  const mappedHotels = mapSupplierHotels(supplierData, normalizedCity);

  // 4️⃣ Save in DB
  console.log("💾 Saving hotels into DB...");
  await Hotel.insertMany(mappedHotels);

  // 5️⃣ Return hotels
  return mappedHotels;
};