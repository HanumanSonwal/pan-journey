"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createDestinationApi,
  deleteDestinationApi,
  getDestinationsApi,
  updateDestinationApi,
} from "../api/destination.service";

export const useDestination = (params = {}, enabled = true) => {
  const queryClient = useQueryClient();

  const queryKey = ["destinations", params];

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getDestinationsApi(params),
    enabled,
    keepPreviousData: true,
  });

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  const createDestination = useMutation({
    mutationFn: createDestinationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
      });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  */

  const updateDestination = useMutation({
    mutationFn: ({ id, data }) =>
      updateDestinationApi({
        id,
        data,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
      });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const deleteDestination = useMutation({
    mutationFn: deleteDestinationApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
      });
    },
  });

  return {
    destinations: data || [],

    isLoading,

    createDestination,

    updateDestination,

    deleteDestination,
  };
};
