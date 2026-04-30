import jwt from "jsonwebtoken";
import User from "../../user/user.model.js";
import { generateAccessToken } from "../../../utils/authentication/token.util.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const newAccessToken = generateAccessToken(user);

    return res.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("❌ REFRESH ERROR:", err.message);

    return res.status(500).json({
      success: false,
      message: "Refresh failed",
    });
  }
};