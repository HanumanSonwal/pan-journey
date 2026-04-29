import { useMutation } from "@tanstack/react-query";
import { sendOtpApi, verifyOtpApi } from "../api/auth.api";

export const useSendOtp = () =>
  useMutation({
    mutationFn: sendOtpApi, // 🔥 DIRECT
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: verifyOtpApi,
  });
