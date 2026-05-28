import { serverApi } from "@/services/serverApi";

export const getCmsBySlug = async ({ slug, type }) => {
  const response = await serverApi.get(
    `/seo-content?type=${type}&slug=${slug}`,
  );

  return response?.data;
};
