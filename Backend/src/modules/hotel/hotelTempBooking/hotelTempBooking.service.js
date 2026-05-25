import axios from "axios";

import { supplierAPI } from "../../../config/supplierApi.js";

import { getAuthHeader } from "../../../config/supplierAuth.service.js";

export const hotelTempBookingAPI = async ({
  searchKey,
  hotelKey,
  recommendationId,
  customer,
  occupants,
  cardDetails = [],
  remarks = "",
  panNumber = "",
}) => {

  const payload = {
    AuthHeader: getAuthHeader(),

    SearchKey: searchKey,
    HotelKey: hotelKey,
    RecommendationId: recommendationId,

    CustomerMobile: customer.mobile,

    CustomerPostalCode:
      customer.postalCode,

    CustomerName: customer.name,

    CustomerAddress:
      customer.address,

    "Occupant Mobile":
      customer.mobile,

    "Occupant Email":
      customer.email,

    PANNumber: panNumber,

    Remarks: remarks,

    OccupantDetails: occupants.map(
      (occ, index) => ({
        RoomNo: occ.roomNo || "1",

        OccupantID: String(index + 1),

        "Occupant type":
          occ.type || "Adult",

        Title: occ.title,

        FirstName: occ.firstName,

        LastName: occ.lastName,
      })
    ),

    CardDetails: cardDetails,
  };

  console.log(
    "\n=========== TEMP BOOKING REQUEST ==========="
  );

  console.log(
    JSON.stringify(payload, null, 2)
  );

  const response = await axios.post(
    `${supplierAPI}/HotelTempBooking`,
    payload,
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

  console.log(
    "\n=========== TEMP BOOKING RESPONSE ==========="
  );

  console.log(
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
};