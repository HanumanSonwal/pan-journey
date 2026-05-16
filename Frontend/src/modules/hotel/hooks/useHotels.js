import { useQuery } from "@tanstack/react-query";

import { searchHotels } from "../api/hotel.service";

export const useHotels = (params) => {
  return useQuery({
    queryKey: ["hotels", params],

    queryFn: () => searchHotels(params),

    enabled: !!params?.id,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
};