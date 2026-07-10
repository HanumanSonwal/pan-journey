import { api } from "@/services/axios";

// Create Razorpay Order
export const createBookingOrderApi = async (payload) => {
  console.log("API Payload:", payload);
  const response = await api.post("/payment/create-booking", payload);
  return response.data.data;
};

// Verify Razorpay Payment
export const verifyBookingPaymentApi = async (payload) => {
  const response = await api.post("/payment/booking-payment-verify", payload);
  return response.data.data;
};
