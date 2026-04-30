import {
  sendEmailOtpService,
  verifyEmailOtpService,
} from "./email.service.js";

export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;

    await sendEmailOtpService(email);

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log("❌ SEND EMAIL OTP ERROR:", err.message);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
export const verifyEmailOtp = async (req, res) => {
  try {
    const data = await verifyEmailOtpService(req.body);

    return res.json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (err) {
    console.log("❌ VERIFY EMAIL OTP ERROR:", err.message);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};