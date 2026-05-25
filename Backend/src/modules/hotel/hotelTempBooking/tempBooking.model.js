import mongoose from "mongoose";

const occupantSchema = new mongoose.Schema(
  {
    roomNo: String,
    type: String,

    title: String,
    firstName: String,
    lastName: String,
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingStatus: {
      type: String,
      enum: [
        "TEMP",
        "CONFIRMED",
        "FAILED",
        "CANCELLED",
      ],
      default: "TEMP",
    },

    tempBookingId: String,

    searchKey: String,
    hotelKey: String,
    recommendationId: String,

    hotel: {
      hotelName: String,
      city: String,

      checkIn: Date,
      checkOut: Date,

      rooms: Number,
    },

    customer: {
      name: String,
      mobile: String,
      email: String,
      address: String,
      postalCode: String,
    },

    occupants: [occupantSchema],

    pricing: {
      totalFare: Number,
      taxes: Number,
      currency: String,
    },

    supplierResponse: mongoose.Schema.Types.Mixed,

    expiresAt: {
      type: Date,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);