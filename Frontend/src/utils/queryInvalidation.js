export const invalidateCurrencyQueries = async (queryClient) => {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: ["hotels"],
    }),

    queryClient.invalidateQueries({
      queryKey: ["hotel-details"],
    }),

    // Future
    // queryClient.invalidateQueries({ queryKey:["hotel-booking"] })
    // queryClient.invalidateQueries({ queryKey:["wishlist"] })
  ]);
};
