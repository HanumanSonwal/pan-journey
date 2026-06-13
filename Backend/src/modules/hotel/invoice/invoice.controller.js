import { generateHotelInvoiceService } from "./invoice.service.js";

export const downloadHotelInvoiceController = async (req, res) => {
  try {
    const { bookingRefNo } = req.params;

    const pdfBuffer = await generateHotelInvoiceService(
      req.user._id,
      bookingRefNo,
    );

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${bookingRefNo}.pdf`,
    );

    return res.send(pdfBuffer);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
