import { supplierAPI, getAuthHeader } from "../../../../../config/supplierApi.js";

export const searchHotelAPI = async (payload) => {
  const supplierPayload = {
    ...getAuthHeader(),
    ...payload,
  };

  const { data } = await supplierAPI.post(
    "/HotelSearch",
    supplierPayload
  );

  return data;
};