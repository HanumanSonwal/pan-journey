import { useQuery } from "@tanstack/react-query";
import { getCurrencyApi } from "../services/currency.api";

export const useCurrency = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: getCurrencyApi,
    staleTime: 1000 * 60 * 5,
  });
};
