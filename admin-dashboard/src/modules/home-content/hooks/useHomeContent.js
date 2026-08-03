import { useMemo } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createHomeContentApi,
  deleteHomeContentApi,
  getHomeContentApi,
  updateHomeContentApi,
} from "../api/homeContent.service";

export const useHomeContent = () => {
  const queryClient = useQueryClient();

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */

  const { data = [], isLoading } = useQuery({
    queryKey: ["homeContent"],

    queryFn: getHomeContentApi,
  });

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  const createHomeContent = useMutation({
    mutationFn: createHomeContentApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeContent"],
      });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  */

  const updateHomeContent = useMutation({
    mutationFn: updateHomeContentApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeContent"],
      });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const deleteHomeContent = useMutation({
    mutationFn: deleteHomeContentApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["homeContent"],
      });
    },
  });

  /*
  |--------------------------------------------------------------------------
  | GROUP DATA
  |--------------------------------------------------------------------------
  */

  const groupedData = useMemo(() => {
    return {
      banner: data?.banner || [],

      vibes: data?.placesAsPerYourVibe || [],

      topRatedHotels: data?.topRatedHotels || [],

      popularDestinations: data?.popularDestinations || [],
    };
  }, [data]);

  return {
    ...groupedData,

    isLoading,

    createHomeContent,

    updateHomeContent,

    deleteHomeContent,
  };
};
