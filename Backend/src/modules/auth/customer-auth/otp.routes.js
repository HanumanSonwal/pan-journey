import express from "express";
import { sendOTP, verifyOTP } from "./otp.controller.js";
import { googleLogin } from "./google.controller.js";

const router = express.Router();

router.post("/otp/send", sendOTP);
router.post("/otp/verify", verifyOTP);
router.post("/google", googleLogin);


export default router;