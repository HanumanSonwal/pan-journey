import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["admin", "staff", "customer"],
      required: true,
    },

    permissions: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    isSystemRole: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Role", roleSchema);
