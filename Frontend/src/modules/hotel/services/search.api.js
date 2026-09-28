export const searchDestinationApi = async (searchText = "") => {
  console.log("DESTINATION REQUEST:", searchText);

  const response = await api.post("/destination/search", {
    searchInput: searchText,
  });

  console.log("DESTINATION RESPONSE:", {
    searchText,
    status: response?.status,
    data: response?.data?.data,
    count: response?.data?.data?.length,
  });

  return response?.data?.data || [];
};
