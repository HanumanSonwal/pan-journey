import Booking from "./tempBooking.model.js";

import { hotelTempBookingAPI } from "./hotelTempBooking.service.js";

export const createTempBooking =
  async (payload) => {

    const supplierResponse =
      await hotelTempBookingAPI(payload);

    // supplier response handle
    if (
      !supplierResponse ||
      supplierResponse.Status !== true
    ) {
      throw new Error(
        supplierResponse?.Message ||
        "Temp booking failed"
      );
    }

    // expiry after 30 mins
    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

    const booking =
      await Booking.create({

        bookingStatus: "TEMP",

        tempBookingId:
          supplierResponse?.TempBookingId,

        searchKey: payload.searchKey,

        hotelKey: payload.hotelKey,

        recommendationId:
          payload.recommendationId,

        customer: payload.customer,

        occupants: payload.occupants,

        pricing: payload.pricing,

        hotel: payload.hotel,

        supplierResponse,

        expiresAt,
      });

    return booking;
  };