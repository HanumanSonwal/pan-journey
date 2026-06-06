

import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

export const getHotelRequeryByUserService = async (
  userId,
  bookingRefNo
) => {
  let bookings;

  if (bookingRefNo) {
    // Specific booking
    bookings = await HotelTempBooking.findOne({
      UserId: userId,
      "responsePayload.BookingRefNo": bookingRefNo,
    }).select("hotelRequeryResponse responsePayload.BookingRefNo");
  } else {
    // All bookings of user
    bookings = await HotelTempBooking.find({
      UserId: userId,
    })
      .sort({ createdAt: -1 })
      .select("hotelRequeryResponse responsePayload.BookingRefNo");
  }

  if (
    !bookings ||
    (Array.isArray(bookings) && bookings.length === 0)
  ) {
    throw new Error("Booking not found");
  }

  return bookings;
};