import express from "express";
import { protectCustomer } from "./../../../middleware/customerAuth.middleware.js";
import { hotelTempBookingController, updateCouponController ,getTempBookingByBookingRefController} from "./hoteltempbookingController.js";

const router = express.Router();

router.post("/hotel-temp-booking", protectCustomer, hotelTempBookingController);
router.put("/hotel-temp-booking/couponApply", protectCustomer, updateCouponController);
router.get( "/latest-payment-booking/:bookingRefNo", protectCustomer,getTempBookingByBookingRefController);


export default router;