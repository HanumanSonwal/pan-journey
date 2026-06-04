"use client";

import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

import { addBalance } from "../services/addBalance.service";

export const useAddBalance = () => {
  return useMutation({
    mutationFn: addBalance,

    onSuccess: () => {
      message.success("Payment successful");
    },

    onError: (error) => {
      message.error(error?.message || "Payment failed");
    },
  });
};
