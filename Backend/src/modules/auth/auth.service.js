import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";
import User from "../user/user.model.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.util.js";

import {
  deleteRefreshToken,
  deleteVerifyToken,
  isRefreshTokenValid,
  isVerifyTokenValid,
  saveRefreshToken,
} from "../../utils/authCache.js";

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

  if (!user) throw new ApiError(401, "Invalid credentials");

  if (
    ["admin", "sub-admin"].includes(user.role?.name) &&
    !user.isEmailVerified
  ) {
    throw new ApiError(403, "Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  // 🔥 TOKEN GENERATION
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken);

  // 🔥 FLATTEN PERMISSIONS
  const permissions = user.role?.permissions?.map((p) => p.name) || [];

  // 🔥 CLEAN USER OBJECT
  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: {
      id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      mobile: userObj.mobile,
    },
    role: user.role?.name || null,
    permissions,
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (token) => {
  if (!token) throw new ApiError(401, "Refresh token missing");

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const isValid = await isRefreshTokenValid(decoded.id, token);

  if (!isValid) {
    throw new ApiError(401, "Invalid refresh token");
  }

  await deleteRefreshToken(decoded.id, token);

  const newAccessToken = generateAccessToken(decoded);
  const newRefreshToken = generateRefreshToken(decoded);

  await saveRefreshToken(decoded.id, newRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutUser = async (userId, token) => {
  if (!userId || !token) {
    throw new ApiError(400, "User ID and token are required");
  }

  await deleteRefreshToken(userId, token);

  return true;
};

export const verifyEmailService = async (token) => {
  if (!token) {
    throw new ApiError(400, "Verification token is required");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(400, "Invalid or expired token");
  }

  const isValid = await isVerifyTokenValid(decoded.id, token);

  if (!isValid) {
    throw new ApiError(400, "Token already used or invalid");
  }

  const user = await User.findById(decoded.id);

  if (!user) throw new ApiError(404, "User not found");

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email already verified");
  }

  user.isEmailVerified = true;
  await user.save();

  await deleteVerifyToken(decoded.id, token);

  return true;
};
