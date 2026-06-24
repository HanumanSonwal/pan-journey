import mongoose from "mongoose";

const grievanceRedressalSchema = new mongoose.Schema(
  {
     UserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },


    subject: {
      type: String,
      required: true,
      trim: true,
    },
       BookingRefNo  : {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
    ticketId: {
    type: String,

  },
 grievanceRedressalid: {
    type: String,
    unique: true,
   
  },
    supportCategory: {
      type: String,
      enum: ["booking_issue", "refund_request", "payment_issue", "hotel_complaint", "partnership_business","general_query"],
      default: "general_query",
        required: true,
    },

status: {
  type: String,
  enum: [
    "Open",
    "In Progress",
    "Resolved",
    "Closed"
  ],
  default: "Open"
},
 
    
    Type: {
      type: String,
      enum: ["hotel", "flight", "bus"],
      default: "hotel",
      
    },

   
    
  },
  {
    timestamps: true,
  }
);

const grievanceRedressal = mongoose.model("grievanceRedressal", grievanceRedressalSchema);

export default grievanceRedressal;