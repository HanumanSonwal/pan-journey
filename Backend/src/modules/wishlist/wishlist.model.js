import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hotelId: {
      type: String,
      required: true,
    },

    hotelName: {
      type: String,
      required: true,
    },

    hotelImage: String,

    cityId: {
      type: String,
      required: true,
    },

    cityName: {
      type: String,
      required: true,
    },

    countryName: {
      type: String,
      default: "",
    },

    supplier: {
      type: String,
      default: "TBO",
    },
  },
  {
    timestamps: true,
  },
);

wishlistSchema.index(
  {
    userId: 1,
    hotelId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Wishlist", wishlistSchema);
