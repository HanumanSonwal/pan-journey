    import mongoose from "mongoose";

const hotelCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    supplier: {
      type: String,
      default: "TBO",
    },

    // supplier booking required data
    supplierData: {
      hotelKey: String,
      recommendationId: String,
      searchKey: String,

      customerName: String,
      customerMobile: String,
      customerAddress: String,
      customerPostalCode: String,

      occupantDetails: [
        {
          OccupantID: Number,
          FirstName: String,
          LastName: String,
          OccupantType: String,
          RoomNo: Number,
          Title: String,
          OccupantEmail: String,
          OccupantMobile: String,
        },
      ],
    },

    hotelData: {
      hotelImage: String,
    },

    // IMPORTANT pricing breakdown
    pricing: {
    
      serviceCharge: Number,
      platformFeeAndTax: Number,
      finalPrice: Number,
    },

    // offer engine
    offer: {
      autoDiscount: {
        type: Number,
        default: 0,
      },

      couponCode: {
        type: String,
        default: null,
      },

      couponDiscount: {
        type: Number,
        default: 0,
      },

      // 70% of service tax max
      maxAllowedDiscount: {
        type: Number,
        default: 0,
      },
    },
offer: {
  autoCouponCode: String,
  autoDiscount: Number,
  couponCode: String,
  couponDiscount: Number
},
    payableAmount: Number,

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    tempBookingStatus: {
      type: String,
      enum: ["initiated", "success", "failed"],
      default: "initiated",
    },

    supplierResponse: {
      bookingRefNo: String,
      statusId: String,
    },

    responseTime: Number,

    errorMessage: String,

   
  },
  { timestamps: true }
);

export default mongoose.model(
  "Hotelcart",
  hotelCartSchema
);

