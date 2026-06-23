import { useMutation } from "@tanstack/react-query";
import { createGrievanceApi } from "../api/grievance.api";

export const useCreateGrievance = () =>
  useMutation({
    mutationFn: createGrievanceApi,
  });
