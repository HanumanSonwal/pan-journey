import { serverApi } from "@/services/serverApi";
import { cache } from "react";

export const fetchBlogBySlug = cache(async (slug) => {
  try {
    const response = await serverApi.get("/cms/blogs", {
      params: {
        slug,
      },
    });

    if (!response?.data?.success) {
      return null;
    }

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch blog by slug:", error);

    return null;
  }
});
