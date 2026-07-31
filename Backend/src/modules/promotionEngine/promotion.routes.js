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
import { checkPermission } from "../../middleware/checkPermission.js";
import { protect } from "../../middleware/auth.middleware.js";
const router = express.Router();


router.get("/get-all-giftCard",  giftcardcontoroller);

router.patch("/coupon-status/:id", updateCouponStatusController);
router.delete("/delete-coupon/:id", deleteCouponAdminController);

//Admin routes
router.get("/get-all-coupons", protect,checkPermission("coupens", "read"), getAllCouponsController);
router.get("/get-single-coupon/:id", protect,checkPermission("coupens", "read"), getSingleCouponController);
router.put("/update-coupon/:id", protect,checkPermission("coupens", "update"), updateCouponAdminController);
router.post("/create-coupon", protect,checkPermission("coupens", "write"), createCouponController);
router.delete("/delete-coupon/:id",protect,checkPermission("coupens", "delete"), deleteCouponAdminController);
export default router;
