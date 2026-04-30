import { normalizeMobile } from "../../../utils/normalizeMobile.js";
import User from "../../user/user.model.js";
import { sendOTPService, verifyOTPService } from "./otp.service.js";

export const sendOTP = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);

    let mobile = normalizeMobile(req.body.mobile);

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    await sendOTPService(mobile);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const verifyOTP = async (req, res) => {
  try {
    console.log("RAW BODY:", req.body); // 🔍 debug

    let mobile = normalizeMobile(req.body.mobile);
    let otp = String(req.body.otp || "");

    if (!mobile || mobile.length !== 10 || !otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile or OTP",
      });
    }

    await verifyOTPService(mobile, otp);

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
