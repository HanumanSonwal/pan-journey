import { api } from "@/services/axios";

/**
 * BLOGS
 */

// Get all blogs / category wise blogs
export const getBlogsApi = (params = {}) => {
  return api.get("/cms/blogs", {
    params,
  });
};

// Get single blog by slug
export const getBlogBySlugApi = (slug) => {
  return api.get(`/cms/blogs/${slug}`);
};

/**
 * BLOG CATEGORIES
 */

// Get blog categories
export const getBlogCategoriesApi = () => {
  return api.get("/masterData/", {
    params: {
      type: "BLOGS",
    },
  });
};
