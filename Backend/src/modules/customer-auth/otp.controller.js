import User from "../user/user.model.js";
import {
  sendOTPService,
  verifyOTPService,
} from "./otp.service.js";

// 🔹 SEND OTP
export const sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile required" });
  }

  await sendOTPService(mobile);

  res.json({
    success: true,
    message: "OTP sent successfully",
  });
};

// 🔹 VERIFY OTP
export const verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      message: "Mobile & OTP required",
    });
  }

  await verifyOTPService(mobile, otp);

  // 🔥 FIND OR CREATE USER
  let user = await User.findOne({ mobile });

  if (!user) {
    user = await User.create({
      mobile,
      provider: "otp",
      type: "customer",
      isMobileVerified: true,
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    data: user,
  });
};