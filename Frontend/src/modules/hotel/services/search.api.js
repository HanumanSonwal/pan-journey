import { api } from "@/services/axios";

export const searchDestinationApi = async (searchText = "") => {
  const response = await api.post("/destination/search", {
    searchInput: searchText,
  });

  return response?.data?.data || [];
};
