import crypto from "crypto";
import mongoose from "mongoose";

import HotelTempBooking from "../hotel/hotelTempBooking/hotelCart.model.js"; // path adjust karna

import razorpay,{
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
}  from "../../config/razorpay.config.js";

export const createOrderService = async ({  tempBookingId,
  userId }) => {
  // ===========================
  // Validate Mongo ObjectId
  // ===========================

  if (!mongoose.Types.ObjectId.isValid(tempBookingId)) {
    throw new Error("Invalid Temp Booking Id");
  }

  // ===========================
  // Find Booking
  // ===========================

  const booking = await HotelTempBooking.findOne({
  _id: tempBookingId,
  userId,
});

  if (!booking) {
    throw new Error("Temp booking not found");
  }

  // ===========================
  // Booking Status Check
  // ===========================

  if (booking.tempBookingStatus !== "payment_pending") {
    throw new Error(
      `Booking is not ready for payment. Current Status : ${booking.tempBookingStatus}`
    );
  }

  // ===========================
  // Already Paid Check
  // ===========================

  if (booking.paymentStatus === "paid") {
    throw new Error("Payment already completed");
  }

  // ===========================
  // Amount Check
  // ===========================

  if (
    !booking.payableAmount ||
    booking.payableAmount <= 0
  ) {
    throw new Error("Invalid payable amount");
  }

  // ===========================
  // Duplicate Order Check
  // ===========================

  if (
    booking.payment?.orderId &&
    booking.payment?.status === "created"
  ) {
    return {
      orderId: booking.payment.orderId,
      amount: booking.payment.amount * 100,
      currency: booking.payment.currency,
      key: process.env.RAZORPAY_KEY_ID,
      tempBookingId: booking._id,
    };
  }

  // ===========================
  // Razorpay Order Create
  // ===========================

  const razorpayOrder =
    await razorpay.orders.create({

      amount: Math.round(
        booking.payableAmount * 100
      ),

      currency: "INR",

      receipt: booking._id.toString(),

      payment_capture: 1,
    });

  // ===========================
  // Save Payment Info
  // ===========================

  booking.payment = {
    gateway: "razorpay",

    orderId: razorpayOrder.id,

    amount: booking.payableAmount,

    currency: "INR",

    status: "created",
  };

  await booking.save();

  // ===========================
  // Return Response
  // ===========================

  return {
    tempBookingId: booking._id,

    orderId: razorpayOrder.id,

    amount: razorpayOrder.amount,

    currency: razorpayOrder.currency,

    key: RAZORPAY_KEY_ID,
  };
};

export const verifyPaymentService = async ({

    tempBookingId,

    razorpay_order_id,

    razorpay_payment_id,

    razorpay_signature,
    
    userId

}) => {

    // ============================
    // Validate Booking Id
    // ============================

    if (
        !mongoose.Types.ObjectId.isValid(
            tempBookingId
        )
    ) {

        throw new Error(
            "Invalid Temp Booking Id"
        );

    }

    // ============================
    // Find Booking
    // ============================

  const booking = await HotelTempBooking.findOne({
  _id: tempBookingId,
  userId,
});

    if (!booking) {

        throw new Error(
            "Booking not found"
        );

    }

    // ============================
    // Already Paid
    // ============================

    if (
        booking.paymentStatus ===
        "paid"
    ) {

        return {

            alreadyVerified: true,

            paymentId:
            booking.payment.paymentId,

            orderId:
            booking.payment.orderId

        };

    }

    // ============================
    // Order Id Check
    // ============================

    if (
        booking.payment.orderId !==
        razorpay_order_id
    ) {

        throw new Error(
            "Invalid Order Id"
        );

    }

    // ============================
    // Signature Verify
    // ============================

 const generatedSignature = crypto
  .createHmac("sha256", RAZORPAY_KEY_SECRET)
  .update(`${razorpay_order_id}|${razorpay_payment_id}`)
  .digest("hex");

    if (
        generatedSignature !==
        razorpay_signature
    ) {

        booking.payment.status =
        "failed";

        booking.paymentStatus =
        "failed";

        booking.tempBookingStatus =
        "payment_failed";

        await booking.save();

        throw new Error(
            "Invalid payment signature"
        );

    }

    // ============================
    // Fetch Payment
    // ============================

    const payment =
    await razorpay.payments.fetch(

        razorpay_payment_id

    );

    if (
        payment.status !==
        "captured"
    ) {

        throw new Error(
            "Payment not captured"
        );

    }

    if (
        payment.order_id !==
        razorpay_order_id
    ) {

        throw new Error(
            "Order mismatch"
        );

    }

    if (
        payment.amount !==
        Math.round(
            booking.payableAmount * 100
        )
    ) {

        throw new Error(
            "Amount mismatch"
        );

    }

    // ============================
    // Update Payment
    // ============================

    booking.payment.paymentId =
    razorpay_payment_id;

    booking.payment.signature =
    razorpay_signature;

    booking.payment.status =
    "success";

    booking.payment.amount =
    booking.payableAmount;

    booking.payment.gatewayResponse =
    payment;

    booking.payment.paidAt =
    new Date();

    // ============================
    // Update Booking
    // ============================

    booking.paymentStatus =
    "paid";

    booking.tempBookingStatus =
    "payment_success";

    await booking.save();

    return {

        paymentVerified: true,

        tempBookingId:
        booking._id,

        paymentId:
        razorpay_payment_id,

        orderId:
        razorpay_order_id,

        amount:
        booking.payableAmount

    };

};