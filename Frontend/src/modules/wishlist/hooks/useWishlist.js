import { useQuery } from "@tanstack/react-query";

import { getWishlist } from "../services/wishlist.service";

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    staleTime: 0,
    refetchOnMount: true,
  });
};
