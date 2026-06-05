
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
  "State",
];

// 🔥 slug generator
const generateSlug = (fullName, type) => {
  const namePart = fullName
    .split(",")[0] // comma ke baad remove
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  const typePart = type
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return `${namePart}-${typePart}`;
};

// // 🔥 main function
// export const searchDestinationFromSupplier = async (searchText) => {
//   try {
//     const payload = {
//       ...getAuthHeader(),
//       SearchInput: searchText,
//     };

//     const { data } = await supplierAPI.post(
//       "/JSONService/HotelSearchbyName",
//       payload
//     );

//     const list = data?.DestinationList || [];

//     // clean supplier response
//     const cleaned = list
//       .filter((item) => ALLOWED_TYPES.includes(item.type))
//       .map((item) => ({
//         id: item.id,
//         name: item.fullName,
//         slug:  generateSlug(item.fullName, item.type), // 👈 new field
//         type: item.type,
//         country: item.country,
//         state: item.state,
//       }));

//     return cleaned;
//   } catch (error) {
//     console.log(
//       "Supplier Search Error:",
//       error.response?.data || error.message
//     );

//     throw new Error("Supplier search failed");
//   }
// };

export const searchDestinationFromSupplier = async (searchText) => {
  try {
    console.time("SUPPLIER_CALL");

    const payload = {
      ...getAuthHeader(),
      SearchInput: searchText,
    };

    const { data } = await supplierAPI.post(
      "/JSONService/HotelSearchbyName",
      payload
    );

    console.timeEnd("SUPPLIER_CALL");

    console.time("TRANSFORM");

    const list = data?.DestinationList || [];

    const cleaned = list
      .filter((item) => ALLOWED_TYPES.includes(item.type))
      .map((item) => ({
        id: item.id,
        name: item.fullName,
        slug: generateSlug(item.fullName, item.type),
        type: item.type,
        country: item.country,
        state: item.state,
      }));

    console.timeEnd("TRANSFORM");

    return cleaned;
  } catch (error) {
    throw error;
  }
}; 