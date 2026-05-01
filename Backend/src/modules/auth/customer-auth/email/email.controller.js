import {
  sendEmailOtpService,
  verifyEmailOtpService,
  completeProfileService
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
// export const verifyEmailOtp = async (req, res) => {
//   try {
//     const data = await verifyEmailOtpService(req.body);

//     return res.json({
//       success: true,
//       message: "Login successful",
//       data,
//     });
//   } catch (err) {
//     console.log("❌ VERIFY EMAIL OTP ERROR:", err.message);

//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };




// 🔹 Verify Email OTP Controller
export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email & OTP required",
      });
    }

    const result = await verifyEmailOtpService(email, otp);

    return res.json({
      success: true,
      message: "Email verified successfully",
      data: result,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



// 🔹 Complete Profile Controller
export const completeProfile = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email & Name required",
      });
    }

    const user = await completeProfileService(email, name);

    return res.json({
      success: true,
      message: "Profile completed",
      data: user,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
