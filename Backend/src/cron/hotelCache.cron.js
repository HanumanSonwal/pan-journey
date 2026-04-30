// import cron from "node-cron";
// import Hotel from "../modules/hotel/hotelSearchCache.model.js";

// // runs every 2 hours
// cron.schedule("0 0 */2 * * *", async () => {
//   try {
//     console.log("🧹 Running hotel cache cleaner (2hr)...");

//     const result = await Hotel.deleteMany({});

//     console.log(`🗑️ Deleted ${result.deletedCount} hotels from cache`);
//   } catch (error) {
//     console.error("❌ Cron error:", error.message);
//   }
// });
