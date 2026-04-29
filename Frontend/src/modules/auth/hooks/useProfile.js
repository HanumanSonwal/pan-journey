import { useMutation } from "@tanstack/react-query";
import { updateProfileApi } from "../api/auth.api";

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfileApi,
  });