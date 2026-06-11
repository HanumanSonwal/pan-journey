import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleWishlist } from "../services/wishlist.service";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlist,

    onMutate: async ({ hotelId }) => {
      await queryClient.cancelQueries({
        queryKey: ["wishlist-ids"],
      });

      const previousIds = queryClient.getQueryData(["wishlist-ids"]) || [];

      queryClient.setQueryData(["wishlist-ids"], (old = []) => {
        const ids = Array.isArray(old) ? old : [];

        const exists = ids.includes(String(hotelId));

        if (exists) {
          return ids.filter((id) => id !== String(hotelId));
        }

        return [...ids, String(hotelId)];
      });

      return { previousIds };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["wishlist-ids"], context?.previousIds || []);
    },

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["wishlist-ids"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["wishlist-city"],
        }),
      ]);
    },
  });
};
