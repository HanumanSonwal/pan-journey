import { getAuthHeader } from "../../../config/supplierAuth.service.js";

export const fetchHotelDetailsFromSupplier = async ({
  hotelId,
  hotelMeta,
  searchContext,
}) => {
  try {
    console.log("========== HOTEL DETAILS DUMMY MODE ==========");
    console.log("Hotel ID:", hotelId);
    console.log("Hotel Meta:", hotelMeta);
    console.log("Search Context:", searchContext);

    // Dummy Search Key
    const searchKey = "DUMMY_SEARCH_KEY";

    // Dummy Supplier Payload (sirf log ke liye)
    const payload = {
      ...getAuthHeader(),
      HotelKey: "DUMMY_HOTEL_KEY",
      SearchKey: searchKey,
    };

    console.log("Dummy Supplier Payload:", payload);

    // ==========================
    // DUMMY HOTEL DETAILS
    // ==========================
    const data = {
      AboutHotel: "Hotel White Park",
      Address:
        "No14, Kumarappa Street, Periamet, Park Town, Chennai 600003",
      City: "Chennai",
      Country: "India",
      HotelName: "Hotel White Park",
      HotelImage:
        "https://pix8.agoda.net/hotelImages/218/2188651/2188651_17042214340052551906.jpg?ca=6&ce=1&s=312x",

      HotelGallery: [
        {
          ImageDesc: "Front View",
          ImageURL:
            "https://pix8.agoda.net/hotelImages/218/2188651/2188651_17042214340052551906.jpg?ca=6&ce=1&s=312x",
        },
        {
          ImageDesc: "Room",
          ImageURL:
            "https://q-xx.bstatic.com/xdata/images/hotel/max300/92116957.jpg?k=a90e689ead210c2412194124445978bc33d1fff895811af4c0b4da4490dbc44e&o=&s=312x",
        },
        {
          ImageDesc: "Lobby",
          ImageURL:
            "https://q-xx.bstatic.com/xdata/images/hotel/max300/91310782.jpg?k=4c85e12d0f69d0b2f769e118608fccc410f808bfbb6abb8bf0dfb1c35bc001cf&o=&s=312x",
        },
      ],

      Amenities:
        "Free WiFi,Restaurant,24 Hours Reception,Room Service,Laundry,Parking,Airport Transfer",

      RatePlanRecommendations: [
        {
          RecommendationId: "REC001",
          BasicAmount: 4326.69,
          GST: 157.56,
          Tax: "664",
          ServiceFeeAmount: 100,
          TotalAmount: 5138.69,

          RatePlanDetails: [
            {
              RateplanId: "RATE001",
              Inclusion: "Room Only",
              Refundable: "True",
              CCRequired: true,
              RoomAvailability: true,

              CancellationPolicy:
                "Free cancellation before check-in.",

              RoomDetails: [
                {
                  GroupID: "1",
                  GroupName: "Deluxe",
                  HotelRoomTypeDesc: "Deluxe Room",
                  SmokingAllowed: false,
                },
              ],
            },
          ],
        },
      ],

      ResponseHeader: {
        ErrorCode: "0000",
        ErrorDesc: "SUCCESS",
        StatusId: "11",
      },
    };

    console.log("Returning Dummy Hotel Details");
    console.log("========== HOTEL DETAILS END ==========");

    return {
      success: true,
      hotelId,
      hotelMeta,
      searchKey,
      supplierResponse: data,
    };
  } catch (error) {
    throw new Error(error.message || "Dummy Hotel Details API Failed");
  }
};