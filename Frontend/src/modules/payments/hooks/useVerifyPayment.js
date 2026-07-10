import { useMutation } from "@tanstack/react-query";
import { verifyBookingPaymentApi } from "../services/payment.api";

export const useVerifyBookingPayment = () => {
  return useMutation({
    mutationFn: verifyBookingPaymentApi,
  });
};
