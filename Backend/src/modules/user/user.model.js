import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: function () {
        return this.type !== "customer";
      },
      index: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["admin", "staff", "customer"],
      required: true,
    },

    password: {
      type: String,
      select: false,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: function () {
        return this.type !== "customer";
      },
    },

    providers: {
      type: [String], // ["otp", "email", "google"]
      default: [],
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true, // 🔥 IMPORTANT
    },

    avatar: {
      type: String,
      default: null,
    },

    // 🔥 PROFILE FLOW
    profileCompleted: {
      type: Boolean,
      default: false,
    },

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
