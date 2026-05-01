import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import { sendSuccess } from "../../../../utils/response/ApiResponse.js";
import user from "../../../user/user.model.js";
import {
  sendEmailOtpService,
  verifyEmailOtpService,
} from "./email.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/authentication/token.util.js";

export const sendEmailOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendError(res, "Email is required", 400);
  }

  await sendEmailOtpService(email);

  return sendSuccess(res, "OTP sent successfully");
});



export const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return sendError(res, "Email & OTP required", 400);
  }

  const result = await verifyEmailOtpService(email, otp,);
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

 return sendSuccess(
    res,
    "Email verified successfully",
    {
      ...result,
      accessToken,
      refreshToken,
    }
  );
});