import { useQuery } from "@tanstack/react-query";
import { getWishlistIds } from "../services/wishlist.service";

export const useWishlistIds = () => {
  return useQuery({
    queryKey: ["wishlist-ids"],
    queryFn: getWishlistIds,
    staleTime: 1000 * 60 * 5,
  });
};
