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

import crypto from "crypto";


// ============================================================
// HOTEL DETAIL SERVICE
// ============================================================

export const getHotelDetailService = async ({
  hotelDetailId,
  hotelId,
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
  // 4. HOTEL KEY
  // ==========================================================

  const hotelKey =
    hotel.hotelKey;


  if (!hotelKey) {
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
      hotelKey,
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
  // 8. MAP SUPPLIER RESPONSE
  // ==========================================================
// 8. MAP SUPPLIER RESPONSE
// ==========================================================

const mappedResponse =
  mapHotelDetailResponse({
    hotel,
    details: supplierResponse,
  });


// ==========================================================
// 9. GENERATE ROOM IDs
// ==========================================================

const rooms =
  (mappedResponse.details?.rooms || []).map(
    (room) => ({
      ...room,
      roomId: crypto.randomUUID(),
    })
  );


// ==========================================================
// 10. SAVE HOTEL DETAIL
// ==========================================================
await HotelDetail.findOneAndUpdate(
  {
    hotelDetailId,
    hotelId,
  },
  {
    $set: {
      hotelId,
      hotelKey,
      searchKey,

      // ========================================================
      // HOTEL BASIC DETAILS
      // ========================================================

      name: mappedResponse.hotel?.name ?? null,

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

      // ========================================================
      // ROOMS
      // ========================================================

      rooms,

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

return {
   hotelDetailId: hotelDetailId,
  hotel: {
    ...hotel,
  },

  details: {
    ...mappedResponse.details,
    rooms,
  },
};};




export const getRoomPricingService = async ({
  hotelDetailId,
  roomId,
}) => {
  // =========================
  // VALIDATION
  // =========================

  if (!hotelDetailId) {
    throw new Error("hotelDetailId is required");
  }

  if (!roomId) {
    throw new Error("roomId is required");
  }

  // =========================
  // FIND HOTEL DETAIL + ROOM
  // BOTH MUST BE IN SAME DOCUMENT
  // =========================

  const hotelDetail = await HotelDetail.findOne({
    hotelDetailId,
    "rooms.roomId": roomId,
  }).lean();

  if (!hotelDetail) {
    throw new Error(
      "Hotel detail or room not found, or hotelDetailId and roomId do not belong to the same document"
    );
  }

  // =========================
  // FIND ROOM FROM SAME DOCUMENT
  // =========================

  const room = hotelDetail.rooms?.find(
    (item) => String(item.roomId) === String(roomId)
  );

  if (!room) {
    throw new Error("Room not found");
  }

  // =========================
  // RETURN RESPONSE
  // =========================

  return {
    hotelDetailId: hotelDetail.hotelDetailId,
    hotelId: hotelDetail.hotelId,
    roomId: room.roomId,

    // =========================
    // HOTEL DETAILS
    // =========================

    name: hotelDetail.name ?? null,

    location: {
      address: hotelDetail.location?.address ?? null,
      city: hotelDetail.location?.city ?? null,
      state: hotelDetail.location?.state ?? null,
      country: hotelDetail.location?.country ?? null,
      pincode: hotelDetail.location?.pincode ?? null,
      latitude: hotelDetail.location?.latitude ?? null,
      longitude: hotelDetail.location?.longitude ?? null,
    },

    starCategory: hotelDetail.starCategory ?? null,

    checkIn: {
      date: hotelDetail.checkIn?.date ?? null,
      time: hotelDetail.checkIn?.time ?? null,
    },

    checkOut: {
      date: hotelDetail.checkOut?.date ?? null,
      time: hotelDetail.checkOut?.time ?? null,
    },

    policy: {
      applicableCode:
        hotelDetail.policy?.applicableCode ?? null,

      state:
        hotelDetail.policy?.state ?? null,

      outPolicyReason:
        hotelDetail.policy?.outPolicyReason ?? null,
    },

    // =========================
    // ROOM PRICING
    // =========================

    pricing: {
      currency: room.pricing?.currency ?? null,
      basicAmount: room.pricing?.basicAmount ?? 0,
      tax: room.pricing?.tax ?? 0,
      totalAmount: room.pricing?.totalAmount ?? 0,
      serviceFee: room.pricing?.serviceFee ?? 0,
      markup: room.pricing?.markup ?? 0,
      gst: room.pricing?.gst ?? 0,
    },
  };
};