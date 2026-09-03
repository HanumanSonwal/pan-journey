import { searchHotelAPI } from "./adapters/flyshop/hotelSearch.api.js";
import { mapHotelSearchRequest } from "./adapters/flyshop/hotelSearch.request.mapper.js";
import { mapHotelSearchResponse } from "./adapters/flyshop/hotelSearch.response.mapper.js";
import { saveHotelSearch } from "./hotelSearch.repository.js";

export const searchHotelService = async (payload) => {
  const supplierPayload =
    mapHotelSearchRequest(payload);

  const supplierResponse =
    await searchHotelAPI(supplierPayload);

  await saveHotelSearch({
    searchId: supplierResponse?.SearchID,
    searchKey: supplierResponse?.SearchKey,

    supplier: "flyshop",

    destination: supplierPayload.Origin,

    checkIn: new Date(payload.checkIn),
    checkOut: new Date(payload.checkOut),

    rooms: payload.rooms,

    hotels: (supplierResponse?.HotelDetails || []).map(
      (hotel) => ({
        hotelId: hotel.HotelId,
        hotelKey: hotel.HotelKey,

        name: hotel.HotelName,

        address: hotel.Address,
        city: hotel.City,
        state: hotel.state,
        pincode: hotel.Pincode,

        latitude: hotel.Latitude
          ? Number(hotel.Latitude)
          : null,

        longitude: hotel.Longitude
          ? Number(hotel.Longitude)
          : null,

        image: hotel.HotelImage,

        starCategory: hotel.StarCategoryId
          ? Number(hotel.StarCategoryId)
          : null,

        facilities: (
          hotel.HotelFacilities || []
        ).map((facility) => ({
          id: facility.FacilityId,
          name: facility.FacilityName?.trim(),
        })),

        pricing: {
          basicAmount: Number(
            hotel.LowestBasicAmount || 0
          ),

          tax: Number(
            hotel.LowestRateTax || 0
          ),

          totalAmount: Number(
            hotel.TotalAmount || 0
          ),

          serviceFee: Number(
            hotel.ServiceFeeAmount || 0
          ),

          markup: Number(
            hotel.TradeMarkupAmount || 0
          ),

          gst: Number(hotel.GST || 0),
        },

        checkIn: {
          date: hotel.CheckInDate,
          time: hotel.CheckInTime,
        },

        checkOut: {
          date: hotel.CheckOutDate,
          time: hotel.CheckOutTime,
        },

        supplier: "flyshop",
      })
    ),

    totalHotels:
      supplierResponse?.HotelDetails?.length || 0,

    moreHotels:
      supplierResponse?.MoreHotels || false,

    responseStatus:
      supplierResponse?.Response_Header?.ErrorCode,

    rawResponse: supplierResponse,

    // 30 minutes
    expiresAt: new Date(
      Date.now() + 30 * 60 * 1000
    ),
  });

  return mapHotelSearchResponse(
    supplierResponse
  );
};