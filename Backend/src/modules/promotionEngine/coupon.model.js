import mongoose from "mongoose";

const couponSchema =
  new mongoose.Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
      },

      title: {
        type: String,
        required: true,
      },

      applicableModules: [
        {
          type: String,
          enum: [
            "hotel",
            "flight",
            "bus",
            "train",
            "wallet",
            "holiday",
          ],
        },
      ],

      discountType: {
        type: String,
        enum: [
          "flat",
          "percent",
        ],
        required: true,
      },

      discountValue: {
        type: Number,
        required: true,
      },

      minAmount: {
        type: Number,
        default: 0,
      },

      // important
      maxDiscountPercentOfServiceTax: {
        type: Number,
        default: 70
      },

      isAutoApply: {
        type: Boolean,
        default: true,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      usageLimit: {
        type: Number,
        default: null
      },

      usedCount: {
        type: Number,
        default: 0
      },

      expiresAt: Date,
    },

    { timestamps: true }
  );

export default mongoose.model(
  "Coupon",
  couponSchema
);