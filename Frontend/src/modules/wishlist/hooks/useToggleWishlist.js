import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleWishlist } from "../services/wishlist.service";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist-ids"],
      });

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
};
