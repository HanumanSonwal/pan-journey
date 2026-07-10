import express from "express";
import { createOrderController ,verifyPaymentController} from "./payment.controller.js";
import { protectCustomer } from "./../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.post("/create-booking", protectCustomer, createOrderController);
router.post("/booking-payment-verify", protectCustomer, verifyPaymentController);

export default router;
