import { supplierAPI } from "../../../../../config/supplierApi.js";
import { getAuthHeader } from "../../../../../config/supplierApi.js";

export const searchDestinationAPI = async (searchInput) => {
  const payload = {
     ...getAuthHeader(),
    SearchInput: searchInput,
  };
console.log("payload -", payload)
  const { data } = await supplierAPI.post(
    "/HotelSearchbyName",
    payload
  );

  return data;
};