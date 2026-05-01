import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/authentication/token.util.js";
import { normalizeMobile } from "../../../../utils/normalizeMobile.js";
import User from "../../../user/user.model.js";
import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import { sendSuccess } from "../../../../utils/response/ApiResponse.js"
import { sendOTPService, verifyOTPService } from "./otp.service.js";
export const sendOTP = asyncHandler(async (req, res) => {
  let mobile = normalizeMobile(req.body.mobile);

  if (!mobile || mobile.length !== 10) {
    return sendError(res, "Invalid mobile number", 400);
  }

  await sendOTPService(mobile);

  return sendSuccess(res, "OTP sent successfully");
});
export const verifyOTP = asyncHandler(async (req, res) => {
  let mobile = normalizeMobile(req.body.mobile);
  let otp = String(req.body.otp || "");

  if (!mobile || mobile.length !== 10 || !otp) {
    return sendError(res, "Invalid mobile or OTP", 400);
  }

  // 🔥 Verify OTP
  await verifyOTPService(mobile, otp);

  // 🔎 Find or Create user
  let user = await User.findOne({ mobile });

  if (user) {
    user.isMobileVerified = true;
    user.provider = user.provider || "otp";
    await user.save();
  } else {
    user = await User.create({
      mobile,
      provider: "otp",
      type: "customer",
      isMobileVerified: true,
      isActive: true,
    });
  }

  if (!user.isActive) {
    return sendError(res, "Account is deactivated", 403);
  }

  // 🔐 Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return sendSuccess(res, "Login successful", {
    _id: user._id,
    mobile: user.mobile,
    email: user.email || null,
    name: user.name || null,
    type: user.type,
    accessToken,
    refreshToken,
  });
});