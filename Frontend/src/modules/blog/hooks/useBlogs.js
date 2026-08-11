"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogsApi } from "../api/blog.api";

export const useBlogs = ({
  categoryId = null,
  search = "",
  page = 1,
  limit = 10,
} = {}) => {
  return useQuery({
    queryKey: [
      "blogs",
      {
        categoryId,
        search,
        page,
        limit,
      },
    ],

    queryFn: () =>
      getBlogsApi({
        ...(categoryId ? { categoryId } : {}),
        ...(search ? { search } : {}),
        page,
        limit,
      }),

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });
};
