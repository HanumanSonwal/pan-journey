// models/seoContent.model.js

import mongoose from "mongoose";

const seoContentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    entityId: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["city", "hotel"],
    },
  },
  {
    timestamps: true,
    strict: false, // dynamic fields allow
  }
);

export default mongoose.model("SEOContent", seoContentSchema);