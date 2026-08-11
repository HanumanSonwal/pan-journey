"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogCategoriesApi } from "../api/blog.api";

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blog-categories"],

    queryFn: getBlogCategoriesApi,

    staleTime: 1000 * 60 * 30,

    retry: 1,
  });
};
