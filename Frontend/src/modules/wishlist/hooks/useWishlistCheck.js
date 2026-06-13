import { useQuery } from "@tanstack/react-query";

import { checkWishlist } from "../services/wishlist.service";

export const useWishlistCheck = (hotelId) => {
  return useQuery({
    queryKey: ["wishlist-check", hotelId],

    queryFn: () => checkWishlist(hotelId),

    enabled: !!hotelId,
  });
};
