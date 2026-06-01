import { serverApi } from "@/services/serverApi";

export const searchDestinationServer =
  async (searchText = "") => {
    try {
      const response =
        await serverApi.post(
          "/Seacrhcity/destination-search",
          {
            SearchInput:
              searchText,
          },
        );

      return (
        response?.data
          ?.data || []
      );
    } catch (err) {
      console.log(
        "DESTINATION SEARCH ERROR",
        err,
      );

      return [];
    }
  };