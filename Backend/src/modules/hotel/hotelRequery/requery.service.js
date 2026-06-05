// import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

// export const getRequeryByUserService = async (
//   User__id
// ) => {
//   const bookings = await HotelTempBooking.find(
//     {
//       User__id,
//     }
//   )
//     .sort({ createdAt: -1 })
//     .lean();

//   return bookings;
// };
import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

export const getHotelRequeryByUserService = async (User__id) => {
  const booking = await HotelTempBooking.findOne({
    User__id,
  }).select("hotelRequeryResponse");

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking.hotelRequeryResponse;
};