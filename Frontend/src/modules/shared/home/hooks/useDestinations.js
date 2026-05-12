import { useQuery } from "@tanstack/react-query";

import { getDestinationsApi } from "../services/destination.api";

export const useDestinations = (
  type,
) => {
  return useQuery({
    queryKey: ["destinations", type],

    queryFn: () =>
      getDestinationsApi(type),

    enabled: !!type,

    staleTime: 1000 * 60 * 5,
  });
};