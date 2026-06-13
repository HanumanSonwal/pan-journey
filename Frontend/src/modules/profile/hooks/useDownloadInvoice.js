"use client";

import { useMutation } from "@tanstack/react-query";
import { downloadInvoiceApi } from "../api/booking.api";

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: downloadInvoiceApi,
  });
};
