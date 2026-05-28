import { serverApi } from "@/services/serverApi";

export const getCmsBySlug = async (slug) => {
  console.log("CMS API CALL:", slug);
  const response = await serverApi.get(`/cms/page/${slug}`);
  console.log("CMS API RESPONSE:", response.data);
  return response?.data?.data;
};
