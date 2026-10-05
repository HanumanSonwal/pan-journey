import { useQuery } from "@tanstack/react-query";
import { searchDestinationApi } from "../services/search.api";

export const useDestinationSearch = (searchText = "") => {
  const trimmedSearch = searchText.trim();

  return useQuery({
    queryKey: ["destination-search", trimmedSearch],

    queryFn: async () => {
      console.log("DESTINATION QUERY:", trimmedSearch);

      const result = await searchDestinationApi(trimmedSearch);

      console.log("DESTINATION QUERY RESULT:", {
        searchText: trimmedSearch,
        count: result?.length || 0,
      });

      return result || [];
    },

    // API call only when 2 or more characters
    enabled: trimmedSearch.length >= 2,

    staleTime: 0,

    gcTime: 10 * 60 * 1000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: "always",

    retry: 1,
  });
};
