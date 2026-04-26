import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
    },

    // 🔥 ROLE (MAIN CONTROL)
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    // 🔥 AUTH PROVIDER
    provider: {
      type: String,
      enum: ["local", "google", "otp"],
      default: "local",
    },

    providerId: {
      type: String, // googleId / otp session id
    },

    // 🔥 STATUS CONTROL
    isActive: {
      type: Boolean,
      default: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isMobileVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
