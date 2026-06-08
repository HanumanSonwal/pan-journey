import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

export const getHotelRequeryByUserService = async (
  userId,
  bookingRefNo,
  status,
) => {
  // Single booking details
  if (bookingRefNo) {
    const booking = await HotelTempBooking.findOne({
      UserId: userId,
      "hotelRequeryResponse.BookingRefNo": bookingRefNo,
    }).select("hotelRequeryResponse");

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking.hotelRequeryResponse;
  }

  // Booking listing
  const query = {
    UserId: userId,
    hotelRequeryResponse: { $exists: true },
  };

  if (status) {
    query["hotelRequeryResponse.TicketStatusDesc"] = status;
  }

  const bookings = await HotelTempBooking.find(query)
    .sort({ createdAt: -1 })
    .select("hotelRequeryResponse");

  if (!bookings.length) {
    throw new Error("No bookings found");
  }

  return bookings.map((item) => ({
    hotelName: item.hotelRequeryResponse?.HotelDetails?.HotelName,
    Address: item.hotelRequeryResponse?.HotelDetails?.Address,
    checkInDate: item.hotelRequeryResponse?.CheckInDate,
    checkOutDate: item.hotelRequeryResponse?.CheckOutDate,
    voucherNumber: item.hotelRequeryResponse?.VoucherNumber,
    TicketStatusDesc: item.hotelRequeryResponse?.TicketStatusDesc,
    bookingRefNo: item.hotelRequeryResponse?.BookingRefNo,
  }));
};
