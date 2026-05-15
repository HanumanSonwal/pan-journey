import { getAuthHeader, supplierAPI } from "../../../config/supplierApi.js";

export const fetchSupplierHotelDetails = async ({ hotelKey, searchKey }) => {
  try {
    const payload = {
      ...getAuthHeader(), // ✅ reuse auth header
      HotelKey: hotelKey,
      SearchKey: searchKey,
    };

    console.log("🏨 HOTEL DETAILS PAYLOAD:", payload);

    const { data } = await supplierAPI.post("/HotelDetails", payload);

    // ❌ Supplier error handling
    if (data?.ResponseHeader?.ErrorCode !== "0") {
      console.error("❌ Supplier Error:", data?.ResponseHeader);
      throw new Error(data?.ResponseHeader?.ErrorDesc || "Supplier error");
    }

    return data;
  } catch (error) {
    console.error(
      "❌ Supplier HotelDetails Error:",
      error?.response?.data || error.message,
    );
    throw new Error("Supplier hotel details failed");
  }
};
