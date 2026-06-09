import HotelTempBooking from "../hotelTempBooking/hotelTempBooking.model.js";

import { createPdfBuffer } from "./utils/pdfGenerator.js";

import { buildHotelInvoice } from "./templates/hotelInvoice.template.js";

export const generateHotelInvoiceService = async (userId, bookingRefNo) => {
  const booking = await HotelTempBooking.findOne({
    UserId: userId,
    "hotelRequeryResponse.BookingRefNo": bookingRefNo,
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const data = booking.hotelRequeryResponse;

  const pdfBuffer = await createPdfBuffer((doc) => {
    buildHotelInvoice(doc, data);
  });

  return pdfBuffer;
};
