import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMarkupApi, getMarkupsApi } from "../services/markup.service";

export const useMarkups = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["markups"],
    queryFn: getMarkupsApi,
  });

  const createMarkup = useMutation({
    mutationFn: createMarkupApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markups"],
      });
    },
  });

  return {
    markups: data?.data || [],
    isLoading,
    createMarkup,
  };
};
