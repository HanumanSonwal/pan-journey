// modules/hotel/hotel.cache.model.js
import mongoose from "mongoose";

const hotelCacheSchema = new mongoose.Schema(
  {
    cityId: {
  type: String,
  required: true,
  
},
checkInDate: String,
checkOutDate: String,
roomCount: Number,
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
      expires: 60 * 30 , // 24h TTL
    },
  },
 
);

hotelCacheSchema.index(
  {
    cityId: 1,
    checkInDate: 1,
    checkOutDate: 1,
    roomCount: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("HotelCache", hotelCacheSchema);




