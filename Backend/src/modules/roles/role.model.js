import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description: String,

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 👇 IMPORTANT FIX
const Role =
  mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;