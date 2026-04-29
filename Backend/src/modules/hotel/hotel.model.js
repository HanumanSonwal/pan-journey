import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  supplierHotelId: String,
  name: String,
  city: String,
  address: String,
  starRating: Number,
  latitude: Number,
  longitude: Number,
  images: [String],
  amenities: [String],
  lastUpdated: Date,
}, { timestamps: true });

hotelSchema.index({ city: 1 }); // fast city search

export default mongoose.model("Hotel", hotelSchema);