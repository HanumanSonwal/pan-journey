import { api } from "@/services/axios";

export const searchDestinationApi = async (searchText = "") => {
  const response = await api.post("/Seacrhcity/destination-search", {
    SearchInput: searchText,
  });

  return response?.data?.data || [];
};
