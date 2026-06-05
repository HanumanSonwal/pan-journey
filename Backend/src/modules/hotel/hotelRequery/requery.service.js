// import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

// export const getRequeryByUserService = async (
//   UserId
// ) => {
//   const bookings = await HotelTempBooking.find(
//     {
//       UserId,
//     }
//   )
//     .sort({ createdAt: -1 })
//     .lean();

//   return bookings;
// };
import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

export const getHotelRequeryByUserService = async (UserId) => {
  const booking = await HotelTempBooking.findOne({
    UserId,
  }).select("hotelRequeryResponse");

  if (!booking) {
    throw new Error("Booking not found");
  }

  return booking.hotelRequeryResponse;
};
