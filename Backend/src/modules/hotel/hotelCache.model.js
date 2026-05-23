// modules/hotel/hotel.cache.model.js
import mongoose from "mongoose";

const hotelCacheSchema = new mongoose.Schema(
  {
    cityId: String,
    cityName: String,
    hotels: Array,

    isComplete: {
      type: Boolean,
      default: false,
    },
    searchKey: String,

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 30, // 24h TTL
    },
  },
  { timestamps: true },
);

export default mongoose.model("HotelCache", hotelCacheSchema);
