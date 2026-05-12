import { useQuery } from "@tanstack/react-query";
import { searchDestinationApi } from "../services/search.api";

export const useDestinationSearch = (
  searchText,
) => {
  return useQuery({
    queryKey: ["destination-search", searchText],

    queryFn: () =>
      searchDestinationApi(searchText),

    enabled:
      searchText?.length >= 2 ||
      searchText === "",

    staleTime: 1000 * 60 * 5,
  });
};