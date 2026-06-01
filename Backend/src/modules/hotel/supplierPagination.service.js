
import { supplierAPI } from "../../config/supplierApi.js";
import HotelCache from "./hotelCache.model.js";
import { buildPayload, mergeHotels } from "./searchservice.js";

export const fetchRemainingHotelsInBackground = async (
  body,
  firstResponse,
  auth
) => {

  console.log("🚀 BACKGROUND PAGINATION STARTED");

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let seed = firstResponse?.HotelSeedValue || "";
  let moreHotels = firstResponse?.MoreHotels || false;

  console.log("🌱 INITIAL SEED:", seed);
  console.log("📦 INITIAL MOREHOTELS:", moreHotels);

  // duplicate prevention
  const existingCache = await HotelCache.findOne({
    cityId: body.cityId,
  });

  const existingHotelIds = new Set(
    existingCache?.hotels?.map((h) => h.hotelId) || []
  );

  let attempts = 0;

 let emptyHotelCount = 0;

while (seed && emptyHotelCount < 3) {

  attempts++;

  console.log("\n====================================");
  console.log(`🌐 CONTINUATION CALL #${attempts}`);
  console.log("🌱 USING SEED:", seed);

  try {

    const payload = buildPayload(
      body,
      seed,
      auth
    );

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload
    );

    const data = response.data;

    console.log("📥 RAW RESPONSE:");
    console.log(JSON.stringify(data, null, 2));

    const incomingHotels = mergeHotels(data);

    console.log(
      "🏨 Incoming Hotels:",
      incomingHotels.length
    );

    // ✅ EMPTY HOTEL CHECK
    if (incomingHotels.length === 0) {

      emptyHotelCount++;

      console.log(
        `⚠️ EMPTY HOTEL RESPONSE (${emptyHotelCount}/3)`
      );

    } else {

      emptyHotelCount = 0;
    }

    // ✅ REMOVE DUPLICATES
    const uniqueHotels = incomingHotels.filter(
      (hotel) => {

        if (
          existingHotelIds.has(hotel.hotelId)
        ) {
          return false;
        }

        existingHotelIds.add(hotel.hotelId);

        return true;
      }
    );

    console.log(
      "✨ Unique Hotels:",
      uniqueHotels.length
    );

    // ✅ SAVE HOTELS
    if (uniqueHotels.length > 0) {

      await HotelCache.updateOne(
        { cityId: body.cityId },
        {
          $addToSet: {
            hotels: {
              $each: uniqueHotels,
            },
          },
        }
      );

      console.log(
        "➕ NEW HOTELS SAVED:",
        uniqueHotels.length
      );
    }

    // ✅ UPDATE SEED
    const oldSeed = seed;

    seed = data?.HotelSeedValue || seed;

    console.log("🌱 OLD SEED:", oldSeed);
    console.log("🌱 NEW SEED:", seed);

    console.log(
      "🧮 TOTAL SAVED HOTELS:",
      existingHotelIds.size
    );

    await sleep(3000);

  } catch (error) {

    console.log(
      "❌ BACKGROUND PAGINATION ERROR"
    );

    console.log(
      error?.response?.data || error.message
    );

    emptyHotelCount++;

    await sleep(5000);
  }
}

console.log(
  "🛑 STOPPED AFTER 3 EMPTY RESPONSES"
);0

  await HotelCache.updateOne(
    { cityId: body.cityId },
    {
      isComplete: true,
    }
  );

  console.log("🏁 BACKGROUND PAGINATION COMPLETED");
};