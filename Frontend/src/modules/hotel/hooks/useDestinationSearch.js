import { useQuery } from "@tanstack/react-query";
import { searchDestinationApi } from "../services/search.api";

export const useDestinationSearch = (searchText = "") => {
  const trimmedSearch = searchText.trim();

  return useQuery({
    queryKey: ["destination-search", trimmedSearch],
    queryFn: () => searchDestinationApi(trimmedSearch),
    enabled: trimmedSearch.length >= 2,
    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
