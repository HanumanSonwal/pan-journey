import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/auth.api";

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
  });