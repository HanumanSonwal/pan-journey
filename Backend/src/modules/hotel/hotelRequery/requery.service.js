// import HotelTempBooking from "../hotelTempBooking/hotelCart.model.js";

// export const getHotelRequeryByUserService = async (
//   userId,
//   bookingRefNo,
//   status,
// ) => {
//   // Single booking details
//   if (bookingRefNo) {
//     const booking = await HotelTempBooking.findOne({
//       UserId: userId,
//       "hotelRequeryResponse.BookingRefNo": bookingRefNo,
//     }).select("hotelRequeryResponse");

//     if (!booking) {
//       throw new Error("Booking not found");
//     }

//     return booking.supplierResponse?.hotelRequeryResponse;
//   }

//   // Booking listing
//   const query = {
//     UserId: userId,
//     hotelRequeryResponse: { $exists: true },
//   };

//   if (status) {
//     query["hotelRequeryResponse.TicketStatusDesc"] = status;
//   }

//   const bookings = await HotelTempBooking.find(query)
//     .sort({ createdAt: -1 })
//     .select("hotelRequeryResponse");

//   if (!bookings.length) {
//     throw new Error("No bookings found");
//   }

//   return bookings.map((item) => ({
//     hotelName: item.supplierResponse?.hotelRequeryResponse?.HotelDetails?.HotelName,
//     Address: item.supplierResponse?.hotelRequeryResponse?.HotelDetails?.Address,
//     checkInDate: item.supplierResponse?.hotelRequeryResponse?.CheckInDate,
//     checkOutDate: item.supplierResponse?.hotelRequeryResponse?.CheckOutDate,
//     voucherNumber: item.supplierResponse?.hotelRequeryResponse?.VoucherNumber,
//     TicketStatusDesc: item.supplierResponse?.hotelRequeryResponse?.TicketStatusDesc,
//     bookingRefNo: item.supplierResponse?.hotelRequeryResponse?.BookingRefNo,
//   }));
// };

// import HotelCart from "../hotelTempBooking/hotelCart.model.js";

// export const getHotelRequeryByUserService = async (
//   userId,
//   bookingRefNo,
//   status
// ) => {

//   // ===================================
//   // Single Booking
//   // ===================================

//   if (bookingRefNo) {

//     const booking = await HotelCart.findOne({
//       userId,
//       "supplierResponse.hotelRequeryResponse.BookingRefNo":
//         bookingRefNo,
//     }).select("supplierResponse.hotelRequeryResponse");

//     if (!booking) {
//       throw new Error("Booking not found");
//     }

//     return booking.supplierResponse.hotelRequeryResponse;
//   }

//   // ===================================
//   // Booking List
//   // ===================================

//   const query = {
//     userId,
//     "supplierResponse.hotelRequeryResponse": {
//       $exists: true,
//     },
//   };

//   if (status) {
//     query[
//       "supplierResponse.hotelRequeryResponse.TicketStatusDesc"
//     ] = status;
//   }

//   const bookings = await HotelCart.find(query)
//     .sort({ createdAt: -1 })
//     .select("supplierResponse.hotelRequeryResponse");

//   if (!bookings.length) {
//     throw new Error("No bookings found");
//   }

//   return bookings.map((item) => {

//     const data =
//       item.supplierResponse.hotelRequeryResponse;

//     return {
//       hotelName:
//         data?.HotelDetails?.HotelName,

//       address:
//         data?.HotelDetails?.Address,

//       checkInDate:
//         data?.CheckInDate,

//       checkOutDate:
//         data?.CheckOutDate,

//       voucherNumber:
//         data?.VoucherNumber,

//       ticketStatus:
//         data?.TicketStatusDesc,

//       bookingRefNo:
//         data?.BookingRefNo,
//     };
//   });

// };
import HotelCart from "../hotelTempBooking/hotelCart.model.js";

export const getHotelRequeryByUserService = async (
  userId,
  bookingRefNo,
  status,
) => {
  // ===================================
  // Base Query
  // ===================================

  const query = {
    userId,
    "supplierResponse.hotelRequeryResponse": { $exists: true },
  };

  if (bookingRefNo) {
    query["supplierResponse.hotelRequeryResponse.BookingRefNo"] = bookingRefNo;
  }

  if (status) {
    query["supplierResponse.hotelRequeryResponse.TicketStatusDesc"] = status;
  }

  const bookings = await HotelCart.find(query).sort({
    createdAt: -1,
  });

  if (!bookings.length) {
    throw new Error("Booking not found");
  }

  const response = bookings.map((booking) => {
    const requery = booking.supplierResponse?.hotelRequeryResponse || {};

    return {
      _id: booking._id,

      pricing: {
        baseAmount:
          (booking.pricing?.finalPrice || 0) -
          (booking.pricing?.platformFeeAndTax || 0),

        serviceCharge: booking.pricing?.serviceCharge,

        platformFeeAndTax: booking.pricing?.platformFeeAndTax,

        finalPrice: booking.pricing?.finalPrice,
      },

      offer: booking.offer,

      payableAmount: booking.payableAmount,
      bookingRefNo: booking.supplierResponse?.bookingRefNo,

      paymentStatus: booking.paymentStatus,

      createdAt: booking.createdAt,

      ticketStatusDesc: requery.TicketStatusDesc,

      checkInDate: requery.CheckInDate,

      checkOutDate: requery.CheckOutDate,

      voucherNumber: requery.VoucherNumber,

      supplierResponse: {
        CancellationPolicy: requery.CancellationPolicy,

        HotelDetails: requery.HotelDetails,

        HotelRoomDetail: requery.HotelRoomDetail,
      },
    };
  });

  // Single Booking
  if (bookingRefNo) {
    return response[0];
  }

  // Booking List
  return response;
};
