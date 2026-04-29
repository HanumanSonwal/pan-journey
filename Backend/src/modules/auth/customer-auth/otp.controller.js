import User from "../../user/user.model.js";
import { sendOTPService, verifyOTPService } from "./otp.service.js";

// 🔹 SEND OTP
export const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile required",
      });
    }

    await sendOTPService(mobile);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// 🔹 VERIFY OTP (🔥 MAIN LOGIC)
export const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile & OTP required",
      });
    }

    // 🔥 OTP verify
    await verifyOTPService(mobile, otp);

    // 🔥 1. Find by mobile
    let user = await User.findOne({ mobile });

    // 🔥 2. If not found → check if Google user exists (by email not possible here)
    // 👉 future में email merge flow करेंगे

    if (user) {
      // 🔥 update existing user
      user.isMobileVerified = true;
      user.provider = user.provider || "otp";
      await user.save();
    } else {
      // 🔥 create new user
      user = await User.create({
        mobile,
        provider: "otp",
        type: "customer",
        isMobileVerified: true,
        isActive: true,
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        mobile: user.mobile,
        email: user.email || null,
        name: user.name || null,
        type: user.type,
      },
    });
  } catch (err) {
    console.log("❌ OTP VERIFY ERROR:", err.message);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
