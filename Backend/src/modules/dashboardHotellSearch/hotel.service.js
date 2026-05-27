// import { supplierAPI } from "../../config/supplierApi.js";
// import { getAuthHeader } from "../../config/supplierAuth.service.js";

// export const hotelSearchService = async ({
//   checkInDate,
//   checkOutDate,
//   rooms,
//   destination,
//   destinationId,
//   roomCount,
// }) => {
//   try {
//     const payload = {
//       ...getAuthHeader(),

//       HotelSeedValue: "",

//       CheckInDate: checkInDate,
//       CheckOutDate: checkOutDate,

//       HotelRoomDetail: rooms,

//       fullName: destination,
//       id: destinationId,

//       RoomCount: roomCount,
//     };

//     const { data } = await supplierAPI.post(
//       "/HotelHost/HotelNewAPIService.svc/JSONService/HotelSearch",
//       payload
//     );

//     return data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// import { supplierAPI } from "../../config/supplierApi.js";
// import { getAuthHeader } from "../../config/supplierAuth.service.js";

// export const hotelSearchService = async (body) => {
//   try {
//     const payload = {
//       ...getAuthHeader(),

//       HotelSeedValue: "",

//       CheckInDate: body.checkInDate,
//       CheckOutDate: body.checkOutDate,

//       HotelRoomDetail: body.rooms,

//       fullName: body.destination,
//       id: body.destinationId,

//       RoomCount: body.roomCount,
//     };

//     console.log(
//       "FINAL PAYLOAD =>",
//       JSON.stringify(payload, null, 2)
//     );

//     const response = await supplierAPI.post(
//       "/JSONService/HotelSearch",
//       payload
//     );

//     console.log("SUPPLIER RESPONSE =>", response.data);

//     return response.data;
//   } catch (error) {
//     console.log("FULL ERROR =>");

//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);

//       throw error.response.data;
//     }

//     console.log(error.message);

//     throw error.message;
//   }
// };

import { supplierAPI } from "../../config/supplierApi.js";
import { getAuthHeader } from "../../config/supplierAuth.service.js";

export const hotelSearchService = async (body) => {
  try {

    console.log("======================================");
    console.log("🚀 HOTEL SEARCH API CALLED");
    console.log("======================================");

    const payload = {
      ...getAuthHeader(),

      HotelSeedValue: "",

      CheckInDate: body.checkInDate,
      CheckOutDate: body.checkOutDate,

      HotelRoomDetail: body.rooms,

      fullName: body.destination,
      id: body.destinationId,

      RoomCount: body.roomCount,
    };

    console.log("📤 FINAL PAYLOAD =>");
    console.log(JSON.stringify(payload, null, 2));

    console.log("======================================");

    const finalURL = `${process.env.SUPPLIER_BASE_URL}/JSONService/HotelSearch`;

    console.log("🌐 FINAL URL =>", finalURL);

    console.log("======================================");

    const response = await supplierAPI.post(
      "/JSONService/HotelSearch",
      payload
    );
    console.log("======================================");
console.log("✅ SUPPLIER RESPONSE RECEIVED");
console.log("======================================");

console.log("📥 RESPONSE STATUS =>", response.status);

console.log("======================================");

console.log("📦 COMPLETE RESPONSE DATA =>");

console.log(JSON.stringify(response.data, null, 2));

console.log("======================================");

/*
  CHECK REAL RESPONSE STRUCTURE
*/

console.log("📦 HOTEL CONTENTS =>");

console.log(
  JSON.stringify(
    response.data?.HotelContents,
    null,
    2
  )
);

console.log("======================================");
const hotels =
  response.data?.HotelContents?.map((hotel) => ({
    hotelName: hotel.HotelName,
    hotelId: hotel.HotelId,
  })) || [];

console.log("FILTERED HOTELS =>");

console.log(JSON.stringify(hotels, null, 2));

return hotels;
    console.log("✅ SUPPLIER RESPONSE RECEIVED");

    console.log("======================================");

    console.log("📥 RESPONSE STATUS =>", response.status);

    console.log("======================================");

    console.log("📦 RESPONSE DATA =>");

    console.log(JSON.stringify(response.data, null, 2));

    console.log("======================================");

    //return response.data;

  } catch (error) {

    console.log("======================================");
    console.log("❌ HOTEL SEARCH ERROR");
    console.log("======================================");

    console.log("🧨 ERROR MESSAGE =>", error.message);

    console.log("======================================");

    console.log("🧨 ERROR CODE =>", error.code);

    console.log("======================================");

    if (error.config) {
      console.log("📡 REQUEST URL =>", error.config.url);

      console.log("📡 REQUEST METHOD =>", error.config.method);

      console.log("📡 REQUEST DATA =>");

      console.log(error.config.data);

      console.log("======================================");
    }

    if (error.response) {

      console.log("📥 RESPONSE STATUS =>", error.response.status);

      console.log("======================================");

      console.log("📥 RESPONSE HEADERS =>");

      console.log(error.response.headers);

      console.log("======================================");

      console.log("📥 RESPONSE DATA =>");

      console.log(
        JSON.stringify(error.response.data, null, 2)
      );

      console.log("======================================");

      throw error.response.data;
    }

    console.log("🧨 FULL ERROR OBJECT =>");

    console.log(error);

    console.log("======================================");

    throw error.message;
  }
};