import axios from "axios";

const FLYSHOP_URL = process.env.FLYSHOP_URL;

export const getHotelDetailsAPI = async ({
  hotelKey,
  searchKey,
}) => {
  const requestBody = {
    AuthHeader: {
      IPAddress: "1",
      Password: process.env.FLYSHOP_PASSWORD,
      RequestId: Date.now().toString(),
      UserId: process.env.FLYSHOP_USER_ID,
    },

    HotelKey: hotelKey,

    SearchKey: searchKey,
  };

  console.log("=================================");
  console.log("Calling Flyshop HotelDetails");
  console.log("HotelKey:", hotelKey);
  console.log("SearchKey:", searchKey);
  console.log("=================================");

  try {
    const response = await axios.post(
      `${FLYSHOP_URL}/HotelDetails`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Flyshop HotelDetails API Error:",
      error?.response?.data || error?.message
    );

    throw error;
  }
};