// import { getAuthHeader } from "../../../config/supplierAuth.service.js";
// import { supplierAPI } from "../../../config/supplierApi.js";

// export const hotelTicketingService = async ({
//   BookingRefNo,
//   SearchKey,
// }) => {
//   try {
//     const payload = {
//       AuthHeader: getAuthHeader().AuthHeader,
//       BookingRefNo,
//       SearchKey,
//     };

//     console.log("\n=========== HOTEL TICKETING REQUEST ===========");
//     console.log(JSON.stringify(payload, null, 2));

//     const response = await supplierAPI.post(
//       "/JSONService/HotelTicketing",
//       payload
//     );

//     console.log("\n=========== HOTEL TICKETING RESPONSE ===========");
//     console.log(JSON.stringify(response.data, null, 2));
//     console.log("===============================================\n");

//     return response.data;
//   } catch (error) {
//     console.error("\n=========== HOTEL TICKETING ERROR ===========");

//     if (error?.response) {
//       console.error("Status:", error.response.status);
//       console.error(
//         JSON.stringify(error.response.data, null, 2)
//       );
//     } else {
//       console.error(error);
//     }

//     console.error("=============================================\n");

//     throw new Error(
//       error?.response?.data?.Message ||
//       "Hotel Ticketing Failed"
//     );
//   }
// };

import { getAuthHeader } from "../../../config/supplierAuth.service.js";
import { supplierAPI } from "../../../config/supplierApi.js";
import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

export const hotelTicketingService = async ({
  BookingRefNo,
  SearchKey,
  User__id,
  


}) => {
  try {
    const payload = {
      AuthHeader: getAuthHeader().AuthHeader,
      BookingRefNo,
      SearchKey,
    };

    console.log(
      "\n=========== HOTEL TICKETING REQUEST ==========="
    );
    console.log(JSON.stringify(payload, null, 2));

    const response = await supplierAPI.post(
      "/JSONService/HotelTicketing",
      payload
    );

    const ticketingData = response.data;

    console.log(
      "\n=========== HOTEL TICKETING RESPONSE ==========="
    );
    console.log(
      JSON.stringify(ticketingData, null, 2)
    );

    const statusId =
      ticketingData?.ResponseHeader?.StatusId;

    // Ticketing Success
    if (
      statusId === "11" &&
      ticketingData?.BookingRefNo &&
      ticketingData?.HotelvoucherNumber
    ) {
      try {
        console.log(
          "✅ Calling Hotel Requery..."
        );

        const requeryPayload = {
          AuthHeader: getAuthHeader().AuthHeader,
          BookingRefNo:
            ticketingData.BookingRefNo,
          HotelvoucherNumber:
            ticketingData.HotelvoucherNumber,
        };

        const requeryResponse =
          await supplierAPI.post(
            "/JSONService/HotelRequery",
            requeryPayload
          );

        const requeryData =
          requeryResponse.data;

        console.log(
          "\n=========== HOTEL REQUERY RESPONSE ==========="
        );
        console.log(
          JSON.stringify(
            requeryData,
            null,
            2
          )
        );

        console.log("User__id", User__id);
console.log("BookingRefNo:", ticketingData.BookingRefNo);

const updatedDoc =await HotelTempBooking.findOneAndUpdate(
          {
            "responsePayload.BookingRefNo":
              ticketingData.BookingRefNo,
          },
          {
            $set: {
               User__id: User__id,
              hotelRequeryResponse:
                requeryData,

              voucherNumber:
                requeryData?.VoucherNumber,

              invoiceNumber:
                requeryData?.InvoiceNumber,

              ticketStatusId:
                requeryData?.TicketStatusId,

              ticketStatusDesc:
                requeryData?.TicketStatusDesc,

              checkInDate:
                requeryData?.CheckInDate,

              checkOutDate:
                requeryData?.CheckOutDate,

              requeryAt:
                new Date(),
            },
          }
        );
console.log("Updated Doc:", updatedDoc);
        console.log(
          "✅ Requery response saved successfully"
        );
      } catch (requeryError) {
        console.error(
          "❌ Requery Failed:",
          requeryError?.response?.data ||
            requeryError.message
        );
      }
    }

    return ticketingData;
  } catch (error) {
    console.error(
      "\n=========== HOTEL TICKETING ERROR ==========="
    );

    if (error?.response) {
      console.error(
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );
    }

    throw new Error(
      error?.response?.data?.Message ||
        "Hotel Ticketing Failed"
    );
  }
};