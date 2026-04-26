import express from "express";
import { sendOTP, verifyOTP } from "./otp.controller.js";

const router = express.Router();

router.post("/send", sendOTP);
router.post("/verify", verifyOTP);


export default router;