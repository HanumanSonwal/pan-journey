import { useQuery } from "@tanstack/react-query";

import { getWishlistCity } from "../services/wishlist.service";

export const useWishlistCity = (cityId) => {
  return useQuery({
    queryKey: ["wishlist-city", cityId],

    queryFn: () => getWishlistCity(cityId),

    enabled: !!cityId,
  });
};
