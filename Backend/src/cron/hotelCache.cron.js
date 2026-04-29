import cron from "node-cron";
import Hotel from "../modules/hotel/hotel.model.js";

// runs every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  try {
    console.log("🧹 Running hotel cache cleaner...");

    const result = await Hotel.deleteMany({});

    console.log(`🗑️ Deleted ${result.deletedCount} hotels from cache`);
  } catch (error) {
    console.error("❌ Cron error:", error.message);
  }
});