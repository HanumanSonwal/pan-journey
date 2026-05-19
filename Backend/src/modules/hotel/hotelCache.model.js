// modules/hotel/hotel.cache.model.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    country: String,
    fullName: String,
    id: String,
    state: String,
    type: String,
  },
  { _id: false }
);

const hotelCacheSchema = new mongoose.Schema(
  {
    cityId: String,
    cityName: String,
    hotels: Array,

    isComplete: {
      type: Boolean,
      default: false,
    },
      //searchKey: String,

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // 24h TTL
    },
  },
  { timestamps: true }
);

export default mongoose.model("HotelCache", hotelCacheSchema);