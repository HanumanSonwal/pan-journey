import HotelSearch from "../hotelSearch/hotelSearch.model.js";
import HotelDetail from "./hotelDetail.model.js";

import {
  getHotelDetailAPI,
} from "./adapters/hotelDetail.api.js";

import {
  mapHotelDetailRequest,
} from "./adapters/hotelDetail.request.mapper.js";

import {
  mapHotelDetailResponse,
} from "./adapters/hotelDetail.response.mapper.js";

import {
  convertHotelPricing,
  convertHotelRoomsPricing,
} from "./hotelCurrency.helper.js";

import crypto from "crypto";


// ============================================================
// HOTEL DETAIL SERVICE
// ============================================================

export const getHotelDetailService = async ({
  hotelDetailId,
  hotelId,
  currency,
}) => {

  // ==========================================================
  // 1. VALIDATION
  // ==========================================================

  if (!hotelDetailId) {
    throw new Error("hotelDetailId is required");
  }

  if (!hotelId) {
    throw new Error("hotelId is required");
  }


  // ==========================================================
  // 2. FIND HOTEL SEARCH
  // ==========================================================

  const hotelSearch =
    await HotelSearch.findOne({
      hotelDetailId,
    }).lean();


  if (!hotelSearch) {
    throw new Error("Hotel search not found");
  }


  // ==========================================================
  // 3. FIND SELECTED HOTEL
  // ==========================================================

  const hotel =
    hotelSearch.hotels?.find(
      (item) =>
        String(item.hotelId) ===
        String(hotelId)
    );


  if (!hotel) {
    throw new Error(
      "Hotel not found for given hotelDetailId and hotelId"
    );
  }


  // ==========================================================
  // 4. HOTEL KEY FROM HOTEL SEARCH
  // ==========================================================

  const searchHotelKey =
    hotel.hotelKey;


  if (!searchHotelKey) {
    throw new Error(
      "HotelKey not found for selected hotel"
    );
  }


  // ==========================================================
  // 5. SEARCH KEY
  // ==========================================================

  const searchKey =
    hotelSearch.searchKey;


  if (!searchKey) {
    throw new Error(
      "SearchKey not found for hotel search"
    );
  }


  // ==========================================================
  // 6. SUPPLIER REQUEST
  // ==========================================================

  const supplierPayload =
    mapHotelDetailRequest({
      hotelKey: searchHotelKey,
      searchKey,
    });


  // ==========================================================
  // 7. SUPPLIER API
  // ==========================================================

  const supplierResponse =
    await getHotelDetailAPI(
      supplierPayload
    );


  // ==========================================================
  // 8. GET NEW HOTEL KEY FROM HOTEL DETAILS RESPONSE
  // ==========================================================

  const detailHotelKey =
    supplierResponse?.HotelKey;


  if (!detailHotelKey) {
    throw new Error(
      "HotelKey not found in Hotel Details API response"
    );
  }


  // ==========================================================
  // 9. MAP SUPPLIER RESPONSE
  // ==========================================================

  const mappedResponse =
    mapHotelDetailResponse({
      hotel,
      details: supplierResponse,
    });


  // ==========================================================
  // 10. GENERATE ROOM IDs
  // ==========================================================

  const rooms =
    (mappedResponse.details?.rooms || []).map(
      (room) => ({
        ...room,
        roomId: crypto.randomUUID(),
      })
    );


  // ==========================================================
  // 11. SAVE HOTEL DETAIL
  // ==========================================================



  await HotelDetail.findOneAndUpdate(
    {
      hotelDetailId,
      hotelId,
    },
    {
      $set: {

        hotelId,

        // ====================================================
        // SAVE NEW HOTEL KEY
        // ====================================================

        hotelKey: detailHotelKey,

        // ====================================================
        // SEARCH KEY
        // ====================================================

        searchKey,

        // ====================================================
        // IMPORTANT INFORMATION
        // ====================================================

        importantInformation:
          mappedResponse.details?.importantInformation ?? [],

        // ====================================================
        // HOTEL BASIC DETAILS
        // ====================================================

        name:
          mappedResponse.hotel?.name ?? null,


        location: {

          address:
            mappedResponse.hotel?.location?.address ?? null,

          city:
            mappedResponse.hotel?.location?.city ?? null,

          state:
            mappedResponse.hotel?.location?.state ?? null,

          country:
            mappedResponse.hotel?.location?.country ?? null,

          pincode:
            mappedResponse.hotel?.location?.pincode ?? null,

          latitude:
            mappedResponse.hotel?.location?.latitude ?? null,

          longitude:
            mappedResponse.hotel?.location?.longitude ?? null,
        },


        starCategory:
          mappedResponse.hotel?.starCategory ?? null,


        checkIn: {

          date:
            mappedResponse.hotel?.checkIn?.date ?? null,

          time:
            mappedResponse.hotel?.checkIn?.time ?? null,
        },


        checkOut: {

          date:
            mappedResponse.hotel?.checkOut?.date ?? null,

          time:
            mappedResponse.hotel?.checkOut?.time ?? null,
        },


        policy: {

          applicableCode:
            mappedResponse.hotel?.policy?.applicableCode ?? null,

          state:
            mappedResponse.hotel?.policy?.state ?? null,

          outPolicyReason:
            mappedResponse.hotel?.policy?.outPolicyReason ?? null,
        },


        gallery:
          mappedResponse.details?.gallery ?? [],


        // ====================================================
        // ROOMS
        // ====================================================
        // IMPORTANT:
        // Save ORIGINAL pricing.
        // Do NOT convert before saving.
        // ====================================================

        rooms,


        // ====================================================
        // EXPIRY
        // ====================================================

        expiresAt: new Date(
          Date.now() + 60 * 60 * 1000
        ),
      },
    },
    {
      upsert: true,
      new: true,
    }
  );


  // ==========================================================
  // 12. CONVERT HOTEL PRICING FOR RESPONSE
  // ==========================================================

  const convertedHotelPricing =
    await convertHotelPricing(
      mappedResponse.hotel?.pricing,
      currency
    );


  // ==========================================================
  // 13. CONVERT ROOM PRICING FOR RESPONSE
  // ==========================================================

  const convertedRooms =
    await convertHotelRoomsPricing(
      rooms,
      currency
    );


  // ==========================================================
  // 14. RETURN RESPONSE
  // ==========================================================
  // RESPONSE STRUCTURE REMAINS SAME
  // ==========================================================

  return {

    hotelDetailId: hotelDetailId,

    hotel: {
      ...hotel,

      pricing:
        convertedHotelPricing,
    },

    details: {
      ...mappedResponse.details,

      rooms:
        convertedRooms,
    },
  };
};



// ============================================================
// ROOM PRICING SERVICE
// ============================================================

export const getRoomPricingService = async ({
  hotelDetailId,
  roomId,
  currency,
}) => {

  // ==========================================================
  // 1. VALIDATION
  // ==========================================================

  if (!hotelDetailId) {
    throw new Error("hotelDetailId is required");
  }

  if (!roomId) {
    throw new Error("roomId is required");
  }


  // ==========================================================
  // 2. FIND HOTEL DETAIL + HOTEL SEARCH
  // ==========================================================

  const [
    hotelDetail,
    hotelSearch,
  ] = await Promise.all([

    HotelDetail.findOne({
      hotelDetailId,
      "rooms.roomId": roomId,
    }).lean(),

    HotelSearch.findOne({
      hotelDetailId,
    })
      .select("rooms")
      .lean(),
  ]);


  if (!hotelDetail) {
    throw new Error(
      "Hotel detail or room not found, or hotelDetailId and roomId do not belong to the same document"
    );
  }


  // ==========================================================
  // 3. FIND ROOM
  // ==========================================================

  const room =
    hotelDetail.rooms?.find(
      (item) =>
        String(item.roomId) ===
        String(roomId)
    );


  if (!room) {
    throw new Error("Room not found");
  }


  // ==========================================================
  // 4. CONVERT ROOM PRICING
  // ==========================================================

  const convertedPricing =
    await convertHotelPricing(
      room.pricing,
      currency
    );


  // ==========================================================
  // 5. RETURN RESPONSE
  // ==========================================================

  return {

    hotelDetailId:
      hotelDetail.hotelDetailId,

    hotelId:
      hotelDetail.hotelId,

    roomId:
      room.roomId,


    // ========================================================
    // HOTEL DETAILS
    // ========================================================

    name:
      hotelDetail.name ?? null,


    location: {

      address:
        hotelDetail.location?.address ?? null,

      city:
        hotelDetail.location?.city ?? null,

      state:
        hotelDetail.location?.state ?? null,

      country:
        hotelDetail.location?.country ?? null,

      pincode:
        hotelDetail.location?.pincode ?? null,

      latitude:
        hotelDetail.location?.latitude ?? null,

      longitude:
        hotelDetail.location?.longitude ?? null,
    },


    starCategory:
      hotelDetail.starCategory ?? null,


    image:
      hotelDetail.gallery?.[0]?.url ?? null,


    importantInformation:
      hotelDetail.importantInformation,


    checkIn: {

      date:
        hotelDetail.checkIn?.date ?? null,

      time:
        hotelDetail.checkIn?.time ?? null,
    },


    checkOut: {

      date:
        hotelDetail.checkOut?.date ?? null,

      time:
        hotelDetail.checkOut?.time ?? null,
    },


    policy: {

      applicableCode:
        hotelDetail.policy?.applicableCode ?? null,

      state:
        hotelDetail.policy?.state ?? null,

      outPolicyReason:
        hotelDetail.policy?.outPolicyReason ?? null,
    },


    // ========================================================
    // ROOM PRICING
    // ========================================================

    pricing:
      convertedPricing,


    rooms: {

      roomType:
        room.roomType ?? null,

      inclusion:
        room.inclusion ?? null,

      additionalInfo:
        room.additionalInfo ?? null,

      guests:
        hotelSearch?.rooms ?? [],

      roomCount:
        hotelSearch?.rooms?.length ?? 0,
    },
  };
};