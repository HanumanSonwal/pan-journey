import { serverApi } from "@/services/serverApi";

export const getThemeServer = async () => {
  try {
    const { data } = await serverApi.get("/theme");

    return data?.data ?? null;
  } catch (error) {
    console.error(
      "Server Theme Fetch Error:",
      error?.response?.data || error?.message,
    );

    return null;
  }
};
