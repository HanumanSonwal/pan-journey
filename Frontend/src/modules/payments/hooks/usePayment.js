import { useMutation } from "@tanstack/react-query";

import { createBookingOrderApi } from "../services/payment.api";

export const useCreateBookingOrder = () => {
  return useMutation({
    mutationFn: createBookingOrderApi,
  });
};
