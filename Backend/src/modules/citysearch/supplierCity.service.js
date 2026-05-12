import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";

const ALLOWED_TYPES = [
  "City",
  "Airport",
  "PointOfInterest",
  "MultiCity",
  "Neighborhood",
  "Region",
  "Hotel",
];

// 🔥 main function
export const searchDestinationFromSupplier = async (searchText) => {
  try {
    const payload = {
      ...getAuthHeader(),
      SearchInput: searchText,
    };

    const { data } = await supplierAPI.post(
      "/JSONService/HotelSearchbyName",
      payload,
    );

    const list = data?.DestinationList || [];

    // clean supplier response
    const cleaned = list
      .filter((item) => ALLOWED_TYPES.includes(item.type))
      .map((item) => ({
        id: item.id,
        name: item.fullName,
        type: item.type,
        country: item.country,
        state: item.state,
      }));

    return cleaned;
  } catch (error) {
    console.log(
      "Supplier Search Error:",
      error.response?.data || error.message,
    );

    throw new Error("Supplier search failed");
  }
};
