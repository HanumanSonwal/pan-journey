import EmailOTP from "./email.model.js";
import User from "../../../user/user.model.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/authentication/token.util.js";

import transporter from "../../../../config/mailer.js";
import { generateOTP } from "../../../../utils/generateOtp.js";

export const sendEmailOtpService = async (email) => {
  if (!email) throw new Error("Email required");

  const otp = generateOTP();

  await EmailOTP.deleteMany({ email });

  await EmailOTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  await transporter.sendMail({
    from: `"Travel App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP is: ${otp}</h2>
      <p>Valid for 5 minutes</p>
    `,
  });

  return true;
};

export const verifyEmailOtpService = async ({ email, otp }) => {
  if (!email || !otp) throw new Error("Email & OTP required");

  const record = await EmailOTP.findOne({ email, otp });

  if (!record) throw new Error("Invalid OTP");

  if (record.expiresAt < Date.now()) {
    await EmailOTP.deleteOne({ email });
    throw new Error("OTP expired");
  }

  await EmailOTP.deleteOne({ email });

  let user = await User.findOne({ email });

  if (user) {
    user.isEmailVerified = true;
    user.provider = user.provider || "email";
    await user.save();
  } else {
    user = await User.create({
      email,
      provider: "email",
      type: "customer",
      isEmailVerified: true,
      isActive: true,
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    _id: user._id,
    email: user.email,
    mobile: user.mobile || null,
    name: user.name || null,
    type: user.type,
    accessToken,
    refreshToken,
  };
};