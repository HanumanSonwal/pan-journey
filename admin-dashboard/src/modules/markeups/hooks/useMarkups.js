import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createMarkupApi,
  deleteMarkupApi,
  getMarkupsApi,
  updateMarkupApi,
  updateMarkupStatusApi,
} from "../services/markup.service";

export const useMarkups = (params = {}) => {
  const queryClient = useQueryClient();

  // ================= GET =================

  const { data: markups = [], isLoading } = useQuery({
    queryKey: ["markups", params],

    queryFn: () => getMarkupsApi(params),

    keepPreviousData: true,
  });

  // ================= CREATE =================

  const createMarkup = useMutation({
    mutationFn: createMarkupApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markups"],
      });
    },
  });

  // ================= UPDATE =================

  const updateMarkup = useMutation({
    mutationFn: ({ id, data }) =>
      updateMarkupApi({
        id,
        data,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markups"],
      });
    },
  });

  // ================= DELETE =================

  const deleteMarkup = useMutation({
    mutationFn: deleteMarkupApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markups"],
      });
    },
  });

  // ================= STATUS UPDATE =================

  const updateStatus = useMutation({
    mutationFn: ({ id, data }) =>
      updateMarkupStatusApi({
        id,
        data,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markups"],
      });
    },
  });

  return {
    markups,
    isLoading,

    createMarkup,
    updateMarkup,
    deleteMarkup,
    updateStatus,
  };
};
