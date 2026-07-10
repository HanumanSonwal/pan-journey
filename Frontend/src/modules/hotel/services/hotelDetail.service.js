import { api } from "@/services/axios";

// export const HotelDetailApi = async (payload) => {
//   const response = await api.post("/Hoteldetails", payload);

//   return response?.data?.data || {};
// };

let count = 0;

export const HotelDetailApi = async (payload) => {
  count++;

  console.log("CALL NO:", count);
  console.log(JSON.stringify(payload, null, 2));

  const response = await api.post("/Hoteldetails", payload);

  return response?.data?.data || {};
};