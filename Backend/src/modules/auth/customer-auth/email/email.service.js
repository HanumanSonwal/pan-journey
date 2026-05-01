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



// 🔹 Verify Email OTP Service
export const verifyEmailOtpService = async (email, otp) => {
  const record = await EmailOTP.findOne({ email, otp });

  if (!record) {
    throw new Error("Invalid or expired OTP");
  }

  // delete OTP after verification
  await EmailOTP.deleteOne({ email });

  // 🔥 Check if user exists
  let user = await User.findOne({ email });

  if (user) {
    user.isEmailVerified = true;
    user.provider = "email";
    await user.save();

    return {
      profileCompleted: !!user.name,
      email: user.email,
    };
  }

  // 🔥 Create new user (without name)
  user = await User.create({
    email,
    provider: "email",
    type: "customer",
    isEmailVerified: true,
    isActive: true,
  });

  return {
    profileCompleted: false,
    email: user.email,
  };
};



// 🔹 Complete Profile Service
export const completeProfileService = async (email, name) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name;
  await user.save();

  return {
    name: user.name,
    email: user.email,
  };
};