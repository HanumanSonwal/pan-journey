// // // // modules/hotel/supplierPagination.service.js

// // // import { supplierAPI } from "../../config/supplierApi.js";
// // // import HotelCache from "./hotelCache.model.js";
// // // import { buildPayload, mergeHotels } from "./searchservice.js";

// // // // export const fetchRemainingHotelsInBackground = async (body, firstResponse) => {

// // // //   try {
// // // //     console.log("=================================================");
// // // //     console.log("🚀 BACKGROUND PAGINATION STARTED");
// // // //     console.log("🏙 City:", body.cityName, "|", body.cityId);
// // // //     console.log("🔑 Initial Seed:", firstResponse.HotelSeedValue);
// // // //     console.log("=================================================");

// // // //     let seedValue = firstResponse.HotelSeedValue;
// // // //     let visited = new Set();
// // // //     let allHotels = [];
// // // //     let page = 1;

// // // //     let emptyPageCount = 0;

// // // //     while (seedValue && !visited.has(seedValue)) {
// // // //       visited.add(seedValue);
// // // //       page++;

// // // //       console.log("\n---------------------------------------------");
// // // //       console.log(`📡 SUPPLIER CALL #${page}`);
// // // //       console.log("🔑 Seed Value:", seedValue);
// // // //       console.log("📦 Already Visited Seeds:", visited.size);

// // // //       const payload = buildPayload(body, seedValue);

// // // //       const { data } = await supplierAPI.post(
// // // //         "/JSONService/HotelSearch",
// // // //         payload
// // // //       );

// // // //       const hotels = mergeHotels(data);

// // // //       console.log("🏨 Hotels Received:", hotels.length);
// // // //       console.log("📊 MoreHotels Flag:", data?.MoreHotels);
// // // //       console.log("🔁 Next Seed:", data?.HotelSeedValue);

// // // //       if (hotels.length === 0) {
// // // //         emptyPageCount++;
// // // //         console.log(`⚠️ Empty Page Count: ${emptyPageCount}`);

// // // //         if (emptyPageCount >= 2) {
// // // //           console.log("🛑 STOP: 2 consecutive empty pages");
// // // //           break;
// // // //         }
// // // //       } else {
// // // //         emptyPageCount = 0;
// // // //         allHotels.push(...hotels);

// // // //         console.log("📥 Total Collected Hotels So Far:", allHotels.length);
// // // //       }

// // // //       // update seed
// // // //       if (!data?.HotelSeedValue) {
// // // //         console.log("🛑 STOP: No next seed returned");
// // // //         break;
// // // //       }

// // // //       seedValue = data.HotelSeedValue;

// // // //       if (!data.MoreHotels) {
// // // //         console.log("🛑 STOP: MoreHotels = false");
// // // //         break;
// // // //       }
// // // //     }

// // // //     console.log("\n=================================================");
// // // //     console.log("📦 BACKGROUND FETCH COMPLETED");
// // // //     console.log("🏨 Total Hotels Collected:", allHotels.length);
// // // //     console.log("=================================================\n");

// // // //     // ---------------- CACHE UPDATE ----------------
// // // //     if (allHotels.length) {
// // // //       console.log("💾 Updating cache...");

// // // //       const cache = await HotelCache.findOne({ cityId: body.cityId });

// // // //       if (!cache) {
// // // //         console.log("⚠️ Cache not found, skipping update");
// // // //         return;
// // // //       }

// // // //       const map = new Map();

// // // //       [...(cache.hotels || []), ...allHotels].forEach((h) => {
// // // //         map.set(h.hotelId, h);
// // // //       });

// // // //       cache.hotels = Array.from(map.values());
// // // //       cache.isComplete = true;

// // // //       await cache.save();

// // // //       console.log("✅ CACHE UPDATED SUCCESSFULLY");
// // // //       console.log("🏨 Final Cached Hotels:", cache.hotels.length);
// // // //     } else {
// // // //       console.log("⚠️ No new hotels to update in cache");
// // // //     }

// // // //     console.log("🎉 BACKGROUND JOB FINISHED SUCCESSFULLY");
// // // //   } catch (err) {
// // // //     console.log("❌ BACKGROUND ERROR OCCURRED");
// // // //     console.log("🧨 Error Message:", err.message);
// // // //     console.log("🧨 Stack (short):", err.stack?.split("\n")[0]);
// // // //   }
// // // // };

// // // export const fetchRemainingHotelsInBackground = async (body, firstResponse) => {
// // //   console.log("🚀 BACKGROUND PAGINATION STARTED");
// // // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// // // let seed = firstResponse.HotelSeedValue;
// // // let previousSeed = null;
// // //   let retryCount = 0;
// // // while (seed && retryCount < 20 && seed !== previousSeed) {
// // //   console.log("🌐 CONTINUING SEARCH WITH SEED:", seed);

// // //   previousSeed = seed;

// // //   const payload = buildPayload(body, seed);
// // //   const response = await supplierAPI.post("/JSONService/HotelSearch", payload);
// // //   const data = response.data;

// // //   const newHotels = mergeHotels(data);

// // //   if (newHotels.length > 0) {
// // //     await HotelCache.updateOne(
// // //       { cityId: body.cityId },
// // //       { $push: { hotels: { $each: newHotels } } }
// // //     );
// // //     console.log("➕ Added Hotels:", newHotels.length);
// // //   }

// // //   const newSeed = data.HotelSeedValue;

// // //   // ⭐ SEED STOP CHECK (MOST IMPORTANT)
// // //   if (!newSeed || newSeed === previousSeed) {
// // //     console.log("🛑 PAGINATION FINISHED (Seed stopped changing)");
// // //     break;
// // //   }

// // //   // ⭐ Supplier still processing case
// // //   if (!data.MoreHotels && newHotels.length === 0) {
// // //     console.log("⏳ Supplier still processing… waiting 5 sec");
// // //     retryCount++;
// // //     await sleep(5000);
// // //     continue;
// // //   }

// // //   seed = newSeed;
// // //   await sleep(3000);
// // // }
// // // //  while (seed && retryCount < 20 && seed !== previousSeed) {
// // // //     console.log("🌐 CONTINUING SEARCH WITH SEED:", seed);
// // // // previousSeed = seed;
// // // //     const payload = buildPayload(body, seed);
// // // //     const response = await supplierAPI.post("/JSONService/HotelSearch", payload);
// // // //     const data = response.data;

// // // //     const newHotels = mergeHotels(data);

// // // //     // ⭐ DB me push karo
// // // //     if (newHotels.length > 0) {
// // // //       await HotelCache.updateOne(
// // // //         { cityId: body.cityId },
// // // //         { $push: { hotels: { $each: newHotels } } }
// // // //       );

// // // //       console.log("➕ Added Hotels:", newHotels.length);
// // // //     }

// // // //     // ⭐ NEXT SEED UPDATE
// // // //     // seed = data.HotelSeedValue;
// // // //     const newSeed = data.HotelSeedValue;

// // // // // 🛑 अगर नया seed नहीं आया या same आया → search finished
// // // // if (!newSeed || newSeed === previousSeed) {
// // // //   console.log("🛑 PAGINATION FINISHED (Seed stopped changing)");
// // // //   break;
// // // // }

// // // // seed = newSeed;

// // // //     // ⭐ Supplier processing → wait & retry
// // // //     if (!data.MoreHotels && seed) {
// // // //       console.log("⏳ Supplier still processing… waiting 5 sec");
// // // //       retryCount++;
// // // //       await sleep(5000);
// // // //       continue;
// // // //     }

// // // //     // ⭐ Search finished
// // // //     if (!seed) {
// // // //       console.log("🎉 ALL HOTELS FETCHED");
// // // //       break;
// // // //     }

// // // //     await sleep(3000);
// // // //   }

// // //   await HotelCache.updateOne(
// // //     { cityId: body.cityId },
// // //     { isComplete: true }
// // //   );

// // //   console.log("🏁 BACKGROUND PAGINATION COMPLETED");
// // // };

// // import { supplierAPI } from "../../config/supplierApi.js";
// // import HotelCache from "./hotelCache.model.js";
// // import { getAuthHeader } from "../../config/supplierAuth.service.js";
// // import { buildPayload, mergeHotels } from "./searchservice.js";


// // // export const fetchRemainingHotelsInBackground = async (
// // //   body,
// // //   firstResponse,auth
// // // ) => {
// // //   console.log("🚀 BACKGROUND PAGINATION STARTED");

// // //   const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// // //   let seed = firstResponse.HotelSeedValue;

// // //   let sameSeedCount = 0;
// // //   let noHotelCount = 0;

// // //   while (seed && sameSeedCount < 5) {
// // //     console.log("🌐 CONTINUING SEARCH WITH SEED:", seed);

// // //     const auth = getAuthHeader().AuthHeader;



// // //     const payload = buildPayload(
// // //   body,
// // //   seed,
// // //   auth
// // // );

// // //     const response = await supplierAPI.post(
// // //       "/JSONService/HotelSearch",
// // //       payload
// // //     );

// // //     const data = response.data;

// // //     const newHotels = mergeHotels(data);

// // //     console.log("🏨 Hotels:", newHotels.length);
// // //     console.log("📦 MoreHotels:", data.MoreHotels);

// // //     // =========================
// // //     // SAVE HOTELS
// // //     // =========================
// // //     if (newHotels.length > 0) {
// // //       await HotelCache.updateOne(
// // //         { cityId: body.cityId },
// // //         {
// // //           $addToSet: {
// // //             hotels: { $each: newHotels },
// // //           },
// // //         }
// // //       );

// // //       console.log("➕ Added Hotels:", newHotels.length);

// // //       noHotelCount = 0;
// // //     } else {
// // //       noHotelCount++;
// // //     }

// // //     const newSeed = data.HotelSeedValue;

// // //     // =========================
// // //     // SAME SEED CHECK
// // //     // =========================
// // //     if (newSeed === seed) {
// // //       sameSeedCount++;

// // //       console.log(
// // //         `⏳ SAME SEED RECEIVED (${sameSeedCount})`
// // //       );

// // //       await sleep(5000);

// // //     } else {
// // //       sameSeedCount = 0;
// // //     }

// // //     // =========================
// // //     // FINAL STOP CONDITIONS
// // //     // =========================
// // //     if (
// // //       !data.MoreHotels &&
// // //       noHotelCount >= 3
// // //     ) {
// // //       console.log("🛑 PAGINATION FINISHED");
// // //       break;
// // //     }

// // //     seed = newSeed;

// // //     await sleep(3000);
// // //   }

// // //   await HotelCache.updateOne(
// // //     { cityId: body.cityId },
// // //     { isComplete: true }
// // //   );

// // //   console.log("🏁 BACKGROUND PAGINATION COMPLETED");
// // // };

// // export const fetchRemainingHotelsInBackground = async (
// //   body,
// //   firstResponse,
  
// // ) => {
// //   console.log("🚀 BACKGROUND PAGINATION STARTED");
// //   const auth = getAuthHeader().AuthHeader;
// //   const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// //   let seed = firstResponse.HotelSeedValue;

// //   let sameSeedCount = 0;
// //   let noHotelCount = 0;

// //   while (seed && sameSeedCount < 5) {
// //     console.log("🌐 CONTINUING SEARCH WITH SEED:", seed);

// //     const payload = buildPayload(
// //       body,
// //       seed,
// //       auth
// //     );

// //     const response = await supplierAPI.post(
// //       "/JSONService/HotelSearch",
// //       payload
// //     );

// //     const data = response.data;

// //     const newHotels = mergeHotels(data);

// //     console.log("🏨 Hotels:", newHotels.length);
// //     console.log("📦 MoreHotels:", data.MoreHotels);

// //     if (newHotels.length > 0) {
// //       await HotelCache.updateOne(
// //         { cityId: body.cityId },
// //         {
// //           $addToSet: {
// //             hotels: { $each: newHotels },
// //           },
// //         }
// //       );

// //       console.log("➕ Added Hotels:", newHotels.length);

// //       noHotelCount = 0;
// //     } else {
// //       noHotelCount++;
// //     }

// //     const newSeed = data.HotelSeedValue;

// //     console.log({
// //       oldSeed: seed,
// //       newSeed,
// //       sameSeed: seed === newSeed,
// //     });

// //     if (newSeed === seed) {
// //       sameSeedCount++;

// //       console.log(
// //         `⏳ SAME SEED RECEIVED (${sameSeedCount})`
// //       );

// //       await sleep(5000);

// //     } else {
// //       sameSeedCount = 0;
// //     }

// //     if (!data.MoreHotels && noHotelCount >= 3) {
// //       console.log("🛑 PAGINATION FINISHED");
// //       break;
// //     }

// //     seed = newSeed;

// //     await sleep(3000);
// //   }

// //   await HotelCache.updateOne(
// //     { cityId: body.cityId },
// //     { isComplete: true }
// //   );

// //   console.log("🏁 BACKGROUND PAGINATION COMPLETED");
// // };


// import { supplierAPI } from "../../config/supplierApi.js";
// import { getAuthHeader } from "../../config/supplierAuth.service.js";
// import HotelCache from "./hotelCache.model.js";
// import { buildPayload, mergeHotels } from "./searchservice.js";

// export const fetchRemainingHotelsInBackground = async (
//   body,
//   firstResponse
// ) => {

//   console.log("🚀 BACKGROUND PAGINATION STARTED");

//   console.log("📥 FIRST RESPONSE:");
//   console.log(JSON.stringify(firstResponse, null, 2));

//   const auth = getAuthHeader().AuthHeader;

//   console.log("🔐 AUTH:");
//   console.log(JSON.stringify(auth, null, 2));

//   const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

//   let seed = firstResponse.HotelSeedValue;

//   console.log("🌱 INITIAL SEED:", seed);

//   let sameSeedCount = 0;
//   let noHotelCount = 0;

//   while (seed && sameSeedCount < 5) {

//     console.log("\n====================================");
//     console.log("🌐 CONTINUING SEARCH WITH SEED:", seed);

//     const payload = buildPayload(
//       body,
//       seed,
//       auth
//     );

//     console.log("📤 BACKGROUND PAYLOAD:");
//     console.log(JSON.stringify(payload, null, 2));

//     const response = await supplierAPI.post(
//       "/JSONService/HotelSearch",
//       payload
//     );

//     console.log("📥 RAW SUPPLIER RESPONSE:");
//     console.log(JSON.stringify(response.data, null, 2));

//     const data = response.data;

//     const newHotels = mergeHotels(data);

//     console.log("🏨 Hotels:", newHotels.length);
//     console.log("📦 MoreHotels:", data.MoreHotels);

//     if (newHotels.length > 0) {

//       await HotelCache.updateOne(
//         { cityId: body.cityId },
//         {
//           $addToSet: {
//             hotels: { $each: newHotels },
//           },
//         }
//       );

//       console.log("➕ Added Hotels:", newHotels.length);

//       noHotelCount = 0;

//     } else {

//       noHotelCount++;
//     }

//     const newSeed = data.HotelSeedValue;

//     console.log("🌱 SEED CHECK:");
//     console.log({
//       oldSeed: seed,
//       newSeed,
//       sameSeed: seed === newSeed,
//     });

//     if (newSeed === seed) {

//       sameSeedCount++;

//       console.log(
//         `⏳ SAME SEED RECEIVED (${sameSeedCount})`
//       );

//       await sleep(5000);

//     } else {

//       sameSeedCount = 0;
//     }

//     if (!data.MoreHotels && noHotelCount >= 3) {

//       console.log("🛑 PAGINATION FINISHED");

//       break;
//     }

//     seed = newSeed;

//     await sleep(3000);
//   }

//   await HotelCache.updateOne(
//     { cityId: body.cityId },
//     { isComplete: true }
//   );

//   console.log("🏁 BACKGROUND PAGINATION COMPLETED");
// };

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