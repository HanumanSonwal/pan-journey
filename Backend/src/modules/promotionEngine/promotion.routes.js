import express from "express";

import {
  createCouponController,
  deleteCouponAdminController,
  getAllCouponsController,
  getSingleCouponController,
  updateCouponAdminController,
  updateCouponStatusController,
} from "./promotion.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create-coupon", protect, createCouponController);
//router.put("/apply-coupon", protect, applyCouponController);
router.get("/get-all-coupons", protect, getAllCouponsController);
router.get("/get-single-coupon/:id", protect, getSingleCouponController);
router.put("/update-coupon/:id", protect, updateCouponAdminController);
router.patch("/coupon-status/:id", updateCouponStatusController);
router.delete("/delete-coupon/:id", deleteCouponAdminController);

export default router;
