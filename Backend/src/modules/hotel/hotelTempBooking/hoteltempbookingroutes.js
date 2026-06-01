import express from "express";
import { hotelTempBookingController } from "./hoteltempbookingController.js";

const router = express.Router();

router.post("/hotel-temp-booking", hotelTempBookingController);

export default router;