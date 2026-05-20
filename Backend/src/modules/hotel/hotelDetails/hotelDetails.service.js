import { supplierAPI } from "../../../config/supplierApi.js";
import { getAuthHeader } from "../../../config/supplierAuth.service.js";

export const fetchHotelDetailsFromSupplier = async ({ hotelKey, searchKey }) => {
  try {
    const payload = {
      ...getAuthHeader(),
      HotelKey: hotelKey,
      SearchKey: searchKey,
    };

    const { data } = await supplierAPI.post(
      "/JSONService/HotelDetails",
      payload
    );

    return data;
  } catch (error) {
    console.error("Supplier Hotel Detail Error:", error?.response?.data || error.message);
    throw new Error("Supplier HotelDetails API failed");
  }
};