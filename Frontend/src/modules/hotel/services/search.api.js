import { api } from "@/services/axios";

export const searchDestinationApi = async (searchText = "") => {
  const trimmedSearch = searchText.trim();

  if (trimmedSearch.length < 2) {
    return [];
  }

  try {
    const response = await api.post("/destination/search", {
      searchInput: trimmedSearch,
    });

    const payload = response?.data;
    if (payload?.success !== true || !Array.isArray(payload.data)) {
      throw new Error("Invalid destination search response");
    }

    console.log("DESTINATION RESPONSE:", {
      searchText: trimmedSearch,
      status: response?.status,
      count: payload.data.length,
    });

    return payload.data;
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
