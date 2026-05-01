import express from "express";
import { completeProfile } from "../customer-auth/customerProfile/customerProfile.controller.js";
import { sendEmailOtp, verifyEmailOtp } from "./email/email.controller.js";
import { googleLogin } from "./google/google.controller.js";
import { sendOTP, verifyOTP } from "./otp/otp.controller.js";
import { refreshAccessToken } from "./refresh.controller.js";
import { protectCustomer } from "../../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.post("/otp/send", sendOTP);
router.post("/otp/verify", verifyOTP);
router.post("/google", googleLogin);
router.post("/refresh", refreshAccessToken);

// email

router.post("/email/send", sendEmailOtp);
router.post("/email/verify", verifyEmailOtp);

// profile complete
router.patch("/complete-profile", protectCustomer, completeProfile);

export default router;
