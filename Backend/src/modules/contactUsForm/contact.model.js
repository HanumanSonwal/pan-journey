import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
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
       bookingRefIdx  : {
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
    unique: true,
    default: () => `PJ${Math.floor(100000 + Math.random() * 900000)}`
  },

    supportCategory: {
      type: String,
      enum: ["booking_issue", "refund_request", "payment_issue", "hotel_complaint", "partnership_business","general_query"],
      default: "general_query",
        required: true,
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;