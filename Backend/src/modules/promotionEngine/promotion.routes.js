import express from "express";

import {
  createCouponController,
  deleteCouponAdminController,
  getAllCouponsController,
  getSingleCouponController,
  updateCouponAdminController,
  updateCouponStatusController,
  giftcardcontoroller
} from "./promotion.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create-coupon", protect, createCouponController);
router.get("/get-all-giftCard",  giftcardcontoroller);
router.get("/get-all-coupons", protect, getAllCouponsController);
router.get("/get-single-coupon/:id", protect, getSingleCouponController);
router.put("/update-coupon/:id", protect, updateCouponAdminController);
router.patch("/coupon-status/:id", updateCouponStatusController);
router.delete("/delete-coupon/:id", deleteCouponAdminController);

export default router;
