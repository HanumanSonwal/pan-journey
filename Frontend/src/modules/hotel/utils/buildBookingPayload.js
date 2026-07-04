export const buildBookingPayload = ({
  bookingData,
  guestData,
  requestData,
}) => {
  console.log("bookingData in payload", bookingData);
  const selectedHotel = bookingData?.selectedHotel;
  const ratePlan = bookingData?.selectedRatePlan;
  const pricing = ratePlan?.PricingBreakdown ?? {};
  const primaryGuest = guestData?.primaryGuest || {};
  const additionalGuests = guestData?.additionalGuests || [];
  const occupants = [primaryGuest, ...additionalGuests];

  return {
    CustomerName: `${primaryGuest?.firstName || ""} ${
      primaryGuest?.lastName || ""
    }`.trim(),
    CustomerMobile: primaryGuest?.mobile || "",
    CustomerAddress: "NA",
    CustomerPostalCode: "000000",
    HotelImage: "",
    HotelKey: selectedHotel?.hotelKey || "",

    OccupantDetails: occupants.map((guest, index) => ({
      OccupantID: index + 1,
      FirstName: guest?.firstName || "",
      LastName: guest?.lastName || "",
      OccupantType: guest?.isChild ? "Child" : "Adult",
      RoomNo: 1,
      Title: guest?.title || "Mr",
    })),

    OccupantEmail: primaryGuest?.email || "",
    OccupantMobile: primaryGuest?.mobile || "",
    PANNumber: "",

    RecommendationID:
      ratePlan?.RecommendationId ??
      ratePlan?.RecommendationID ??
      ratePlan?.recommendationId ??
      "",

    Remarks: requestData?.other || "HotelNewAPI",

    SearchKey: selectedHotel?.searchKey || "",

    pricing: {
      serviceCharge: Number(pricing.ServiceCharge || 0),
      platformFeeAndTax: Number(pricing.platformFeeAndTax || 0),
      finalPrice: Number(pricing.finalPrice || 0),
    },
  };
};
