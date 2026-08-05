import { serverApi } from "@/services/serverApi";

/*
GET HOME CONTENT
*/
export const getHomeContent = async () => {
  const response = await serverApi.get("/homecontent");

  console.log("HOME CONTENT RESPONSE", response?.data);

  return response?.data?.data;
};
