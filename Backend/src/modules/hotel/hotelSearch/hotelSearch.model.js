
import mongoose from "mongoose";

const hotelSearchHotelSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
       hotelDetailId: {
  type: String,
  required: true,
  unique: true,
  index: true,
},
    hotelKey: {
      type: String,
      required: true,
    },
name: String,
    location:  {

      address: String,
      city: String,
      state: String,
      pincode: String,

      latitude: Number,
      longitude: Number,},

    image: String,

    starCategory: Number,

    facilities: [
      {
        id: String,
        name: String,
      },
    ],

    pricing: {
      basicAmount: Number,
      tax: Number,
      totalAmount: Number,
      serviceFee: Number,
      markup: Number,
      gst: Number,
    },

    checkIn: {
      date: String,
      time: String,
    },

    checkOut: {
      date: String,
      time: String,
    },

    supplier: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const hotelSearchSchema = new mongoose.Schema(
  {
    searchId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    searchKey: {
      type: String,
      default: null,
    },

    supplier: {
      type: String,
      required: true,
      index: true,
    },

    destination: {
      type: String,
      index: true,
    },

    checkIn: Date,

    checkOut: Date,

    rooms: mongoose.Schema.Types.Mixed,

    hotels: [hotelSearchHotelSchema],

    totalHotels: {
      type: Number,
      default: 0,
    },
cacheKey: {
  type: String,
  index: true,
},
    moreHotels: {
      type: Boolean,
      default: false,
    },

    responseStatus: {
      type: String,
    },

    rawResponse: {
      type: mongoose.Schema.Types.Mixed,
    },

   expiresAt: {
  type: Date,
  required: true,
  index: {
    expireAfterSeconds: 0,
  },
},
  },
  {
    timestamps: true,
  }
);

hotelSearchSchema.index({
  expiresAt: 1,
});

export default mongoose.model(
  "HotelSearch",
  hotelSearchSchema
);

