import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/authentication/token.util.js";
import {
  sendError,
  sendSuccess,
} from "../../../../utils/response/ApiResponse.js";

import { sendEmailOtpService, verifyEmailOtpService } from "./email.service.js";

export const sendEmailOtp = asyncHandler(async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();

  if (!email) {
    return sendError(res, "Email is required", 400);
  }

  await sendEmailOtpService(email);

  return sendSuccess(res, "OTP sent successfully");
});

export const verifyEmailOtp = asyncHandler(async (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const { otp } = req.body;

  if (!email || !otp) {
    return sendError(res, "Email & OTP required", 400);
  }

  const user = await verifyEmailOtpService(email, otp);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return sendSuccess(res, "Login successful", {
    _id: user._id,
    email: user.email,
    mobile: user.mobile || null,
    name: user.name || null,
    type: user.type,
    accessToken,
    refreshToken,

    profileCompleted: user.profileCompleted,
  });
});
