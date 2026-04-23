import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
    },

    description: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;