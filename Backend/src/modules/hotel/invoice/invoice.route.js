import express from "express";
import { protectCustomer } from "../../../middleware/customerAuth.middleware.js";
import { downloadHotelInvoiceController } from "./invoice.controller.js";

const router = express.Router();

router.get(
  "/hotel/invoice/:bookingRefNo",
  protectCustomer,
  downloadHotelInvoiceController,
);

export default router;