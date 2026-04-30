import transporter from "../../../../config/mailer.js";
import { generateOTP } from "../../../../utils/generateOtp.js";
import EmailOTP from "../loginEmailotp/emailOtp.model.js";

import User from "../../../user/user.model.js";

export const sendEmailOtp = async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();

  await EmailOTP.findOneAndDelete({ email });

  await EmailOTP.create({ email, otp });

  await transporter.sendMail({
    from: `"Travel App" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2>
           <p>Valid for 5 minutes</p>`
  });

  res.json({ message: "OTP sent successfully" });
};

// export const verifyEmailOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   const record = await EmailOTP.findOne({ email, otp });

//   if (!record) {
//     return res.status(400).json({ message: "Invalid or expired OTP" });
//   }

//   await EmailOTP.deleteOne({ email });

//   res.json({ message: "Email verified successfully" });
// };



export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email & OTP required",
      });
    }

    // 🔥 1. OTP verify
    const record = await EmailOTP.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await EmailOTP.deleteOne({ email });

    // 🔥 2. Find existing user by email
    let user = await User.findOne({ email });

    if (user) {
      // 🔥 update existing user
      user.isEmailVerified = true;
      user.provider = user.provider || "email";
      await user.save();
    } else {
      // 🔥 create new user (same like mobile OTP)
      user = await User.create({
        email,
        provider: "email",
        type: "customer",
        isEmailVerified: true,
        isActive: true,
      });
    }

    return res.json({
      success: true,
      message: "Email verified successfully",
      data: {
        _id: user._id,
        email: user.email,
        mobile: user.mobile || null,
        name: user.name || null,
        type: user.type,
      },
    });

  } catch (err) {
    console.log("❌ EMAIL OTP VERIFY ERROR:", err.message);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};