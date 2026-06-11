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
    hotelSlug: {
      type: String,
      default: "",
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
    normalizedCity: {
      type: String,
      default: "",
    },

    stateName: {
      type: String,
      default: "",
    },

    countryCode: {
      type: String,
      default: "",
    },

    countryName: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },

    starRating: {
      type: Number,
      default: 0,
    },

    facilities: {
      type: [String],
      default: [],
    },

    freeCancellation: {
      type: Boolean,
      default: false,
    },

    savedPrice: {
      type: Number,
      default: 0,
    },

    savedTax: {
      type: Number,
      default: 0,
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
