import mongoose from "mongoose";

const markupSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: [
        "worldwide",
        "country",
        "state",
        "city",
        "hotel",
        "additional_tax",
        "serviceTax",
      ],
      required: true,
    },

    markupType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },

    markupValue: {
      type: Number,
      required: true,
    },

    serviceChargeValue: {
      type: Number,
      default: 0,
    },

    countryCode: {
      type: String,
      trim: true,
      uppercase: true,
    },

    stateName: {
      type: String,
      trim: true,
    },

    cityName: {
      type: String,
      trim: true,
    },

    hotelId: {
      type: String,
      trim: true,
    },

    hotelName: {
      type: String,
      trim: true,
    },

    startDate: Date,
    endDate: Date,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

markupSchema.index(
  { level: 1 },
  {
    unique: true,
    partialFilterExpression: {
      level: "worldwide",
      isActive: true,
    },
  }
);

markupSchema.index(
  { level: 1, countryCode: 1 },
  {
    unique: true,
    partialFilterExpression: {
      level: "country",
      isActive: true,
    },
  }
);

markupSchema.index(
  { level: 1, countryCode: 1, stateName: 1 },
  {
    unique: true,
    partialFilterExpression: {
      level: "state",
      isActive: true,
    },
  }
);

markupSchema.index(
  { level: 1, cityName: 1 },
  {
    unique: true,
    partialFilterExpression: {
      level: "city",
      isActive: true,
    },
  }
);

markupSchema.index(
  { level: 1, hotelId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      level: "hotel",
      isActive: true,
    },
  }
);

export default mongoose.model("Markup", markupSchema);
