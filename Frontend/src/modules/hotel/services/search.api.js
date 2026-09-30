import { api } from "@/services/axios";


export const searchDestinationApi = async (searchText = "") => {
  const trimmedSearch = searchText.trim();

  if (trimmedSearch.length < 2) {
    return [];
  }

  console.log("DESTINATION REQUEST:", trimmedSearch);

  try {
    const response = await api.post("/destination/search", {
      searchInput: trimmedSearch,
    });

    const data = response?.data?.data || [];

    console.log("DESTINATION RESPONSE:", {
      searchText: trimmedSearch,
      status: response?.status,
      count: data.length,
      data,
    });

    return data;
  } catch (error) {
    console.error("DESTINATION SEARCH ERROR:", {
      searchText: trimmedSearch,
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });

    throw error;
  }
};
