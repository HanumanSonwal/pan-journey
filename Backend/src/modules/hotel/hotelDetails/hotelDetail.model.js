import mongoose from "mongoose";

const HotelDetailSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
      index: true,
    },

    searchKey: {
      type: String,
      required: true,
    },

    supplierHotelKey: {
      type: String,
      required: true,
    },

    detailHotelKey: {
      type: String,
      default: null,
    },

    hotelMeta: {
      type: Object,
      default: {},
    },

    supplierResponse: {
      type: Object,
      default: {},
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HotelDetail", HotelDetailSchema);