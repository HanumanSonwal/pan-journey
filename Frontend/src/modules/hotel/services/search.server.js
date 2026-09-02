import { serverApi } from "@/services/serverApi";

export const searchDestinationServer = async (searchText = "") => {
  try {
    const response = await serverApi.post("/destination/search", {
      searchInput: searchText,
    });

    return response?.data?.data || [];
  } catch (err) {
    console.error(
      "DESTINATION SEARCH ERROR:",
      err?.response?.data || err?.message,
    );

    return [];
  }
};
