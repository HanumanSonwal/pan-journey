import mongoose from "mongoose";

const markupSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ["worldwide", "country", "state", "city", "hotel"],
      required: true,
    },

    countryCode: String,   // IN
    stateName: String,     // Rajasthan
    cityName: String,      // Jaipur
    hotelId: String,       // Supplier HotelId

    markupType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    markupValue: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: String,
  },
  { timestamps: true }
);

export default mongoose.model("Markup", markupSchema);