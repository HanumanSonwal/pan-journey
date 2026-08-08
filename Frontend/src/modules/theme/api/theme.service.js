import { api } from "@/services/axios";

export const getTheme = async () => {
  const { data } = await api.get("/theme");

  console.log("THEME DATA =>", data);

  return data?.data || null;
};
