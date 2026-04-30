import express from "express";
import { sendOTP, verifyOTP } from "./otp.controller.js";
import { googleLogin } from "./google.controller.js";
import { sendEmailOtp,verifyEmailOtp } from "./loginEmailotp/sendotp.js";

const router = express.Router();

router.post("/otp/send", sendOTP);
router.post("/otp/verify", verifyOTP);
router.post("/google", googleLogin);
router.post("/send-otp-gmail", sendEmailOtp);
router.post("/verify-otp-gmail", verifyEmailOtp);


export default router;