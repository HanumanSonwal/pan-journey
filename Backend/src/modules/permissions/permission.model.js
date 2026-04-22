import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);