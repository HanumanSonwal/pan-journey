"use client";

import { useMutation } from "@tanstack/react-query";
import { addBalance } from "../services/addBalance.service";

export const useAddBalance = () => {
  return useMutation({
    mutationFn: addBalance,
  });
};
