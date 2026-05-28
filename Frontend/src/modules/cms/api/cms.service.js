import { serverApi } from "@/services/serverApi";

/*
GET BY SLUG
*/
export const getCmsBySlug = async (slug) => {
  const response = await serverApi.get(`/cms/page/${slug}`);

  return response?.data?.data;
};

/*
GET ALL CMS
PUBLIC
SITEMAP
*/
export const getAllCmsPages = async () => {
  const response = await serverApi.get("/cms/public/pages?limit=5000");

  console.log("ALL CMS RESPONSE", response?.data);

  return response?.data?.data?.data || [];
};
