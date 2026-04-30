import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../utils/authentication/token.util.js";
import User from "../../../user/user.model.js";

export const googleLogin = async (req, res) => {
  try {
    const { email, name, mobile } = req.body;

    // 🔹 validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    let user = await User.findOne({ email });

    // 🔹 merge by mobile if exists
    if (!user && mobile) {
      user = await User.findOne({ mobile });
    }

    if (user) {
      // 🔥 update existing user
      user.email = email || user.email;
      user.name = name || user.name;
      user.provider = "google";
      user.isEmailVerified = true;

      await user.save();
    } else {
      // 🔥 create new user
      user = await User.create({
        email,
        name: name || "",
        provider: "google",
        type: "customer",
        isEmailVerified: true,
        isActive: true,
      });
    }

    // 🔥 inactive user block
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    // 🔥 GENERATE TOKENS
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.json({
      success: true,
      message: "Google login successful",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        mobile: user.mobile || null,
        type: user.type,
        accessToken, 
        refreshToken, 
      },
    });
  } catch (err) {
    console.log("❌ GOOGLE LOGIN ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};
