import express from "express";
import { hotelTempBookingController } from "./hoteltempbookingController.js";
import { protectCustomer } from "./../../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.post("/hotel-temp-booking", protectCustomer, hotelTempBookingController);

export default router;