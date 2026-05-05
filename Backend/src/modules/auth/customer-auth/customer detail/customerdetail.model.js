import mongoose from "mongoose";

const CustomerDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 1 user = 1 detail document
    },

    passportNo: {
      type: String,
      trim: true,
    },

    expireDate: {
      type: Date,
    },

    issuingCountry: {
      type: String,
      trim: true,
    },

    panCardNumber: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CustomerDocumentDetail", CustomerDetailSchema);