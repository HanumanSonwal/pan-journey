export const buildBookingPayload = ({
  bookingData,
  guestData,
  requestData,
}) => {
  const selectedHotel = bookingData?.selectedHotel;
  const ratePlan = bookingData?.selectedRatePlan;
  const adults = bookingData?.searchData?.adults || 1;
  return {
    CustomerName: guestData?.firstName || "",
    CustomerMobile: guestData?.mobile || "",
    CustomerAddress: "NA",
    CustomerPostalCode: "000000",
    // SAME AS POSTMAN
    HotelImage: "",
    HotelKey: selectedHotel?.hotelKey || "",
    OccupantDetails: Array.from({ length: adults }, (_, index) => ({
      OccupantID: index + 1,
      FirstName: guestData?.firstName || "",
      LastName: guestData?.lastName || "",
      OccupantType: "Adult",
      RoomNo: 1,
      Title: guestData?.title || "Mr",
    })),

    OccupantEmail: guestData?.email || "",
    OccupantMobile: guestData?.mobile || "",
    PANNumber: "",
    RecommendationID: ratePlan?.RecommendationId || "",

    // TEMP REMOVE
    // RatePlanId

    Remarks: requestData?.other || "HotelNewAPI",
    SearchKey: selectedHotel?.searchKey || "",
  };
};
