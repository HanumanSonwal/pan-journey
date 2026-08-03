import mongoose from "mongoose";

const homeContentSchema = new mongoose.Schema(
  {
    sectionType: {
      type: String,
      enum: [
        "banner",
        "vibe",
        "topRatedHotels",
        "popularDestinations"
      ],
      required: true
    },

    title: {
      type: String,
      required: true
    },
    

    category: {
      type: String // Beach, Mountain, Luxury etc
    },

    items: [
      {
        name: String,
        city: String,
        cityId: String,
        hotelId: String,

        image: String,
        alt: String,

        description: String,
        rating: Number
      }
    ],

  

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("HomeContent", homeContentSchema);