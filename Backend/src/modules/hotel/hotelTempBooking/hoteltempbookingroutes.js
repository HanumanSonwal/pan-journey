import express from "express";
import { hotelTempBookingController ,updateCouponController } from "./hoteltempbookingController.js";
import { protectCustomer } from "./../../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.post("/hotel-temp-booking", protectCustomer, hotelTempBookingController);
router.put("/hotel-temp-booking/couponApply", protectCustomer, updateCouponController);

export default router;