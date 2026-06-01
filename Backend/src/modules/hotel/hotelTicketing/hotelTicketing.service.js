import { getAuthHeader } from "../../../config/supplierAuth.service.js";
import { supplierAPI } from "../../../config/supplierApi.js";

export const hotelTicketingService = async ({
  BookingRefNo,
  SearchKey,
}) => {
  try {
    const payload = {
      AuthHeader: getAuthHeader().AuthHeader,
      BookingRefNo,
      SearchKey,
    };

    console.log("\n=========== HOTEL TICKETING REQUEST ===========");
    console.log(JSON.stringify(payload, null, 2));

    const response = await supplierAPI.post(
      "/JSONService/HotelTicketing",
      payload
    );

    console.log("\n=========== HOTEL TICKETING RESPONSE ===========");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("===============================================\n");

    return response.data;
  } catch (error) {
    console.error("\n=========== HOTEL TICKETING ERROR ===========");

    if (error?.response) {
      console.error("Status:", error.response.status);
      console.error(
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error(error);
    }

    console.error("=============================================\n");

    throw new Error(
      error?.response?.data?.Message ||
      "Hotel Ticketing Failed"
    );
  }
};