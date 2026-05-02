import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/auth.api";
import { signOut } from "next-auth/react";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,

    onSuccess: async () => {
      await signOut({ callbackUrl: "/" });
    },

    onError: async () => {
      await signOut({ callbackUrl: "/" });
    },
  });
};