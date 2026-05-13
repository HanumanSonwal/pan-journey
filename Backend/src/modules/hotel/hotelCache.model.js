import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    cityId: String,
    cityName: String,

    hotels: Array,        // merged hotels जो supplier से आये
    nextSeed: String,
    moreHotels: Boolean,
    totalHotels: Number,
    searchKey: String,

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24, // 🔥 Auto delete after 24 hours
    },
  },
  { timestamps: true }
);

export default mongoose.model("HotelCache", hotelSchema);