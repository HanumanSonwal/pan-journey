import express from "express";
import { createOrderController ,verifyPaymentController} from "./payment.controller.js";

const router = express.Router();

router.post("/create-booking", createOrderController);
router.post("/booking-payment-verify", verifyPaymentController);

export default router;
