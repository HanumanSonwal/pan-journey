// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../user/user.model.js";
// import ApiError from "../../utils/ApiError.js";

// import {
//   generateAccessToken,
//   generateRefreshToken,
// } from "../../utils/token.util.js";

// import {
//   saveRefreshToken,
//   isRefreshTokenValid,
//   deleteRefreshToken,
//   isVerifyTokenValid,
//   deleteVerifyToken,
// } from "../../utils/authCache.js";

// export const loginUser = async ({ email, password }) => {
//   if (!email || !password) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) throw new ApiError(401, "Invalid credentials");

//   if (["admin", "sub-admin"].includes(user.role) && !user.isEmailVerified) {
//     throw new ApiError(403, "Please verify your email first");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) throw new ApiError(401, "Invalid credentials");

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);

//   await saveRefreshToken(user._id, refreshToken);

//   const userObj = user.toObject();
//   delete userObj.password;

//   return {
//     user: userObj,
//     accessToken,
//     refreshToken,
//   };
// };

// export const refreshAccessToken = async (token) => {
//   if (!token) throw new ApiError(401, "Refresh token missing");

//   let decoded;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
//   } catch {
//     throw new ApiError(401, "Invalid or expired refresh token");
//   }

//   const isValid = await isRefreshTokenValid(decoded.id, token);

//   if (!isValid) {
//     throw new ApiError(401, "Invalid refresh token");
//   }

//   await deleteRefreshToken(decoded.id, token);

//   const newAccessToken = generateAccessToken(decoded);
//   const newRefreshToken = generateRefreshToken(decoded);

//   await saveRefreshToken(decoded.id, newRefreshToken);

//   return {
//     accessToken: newAccessToken,
//     refreshToken: newRefreshToken,
//   };
// };

// export const logoutUser = async (userId, token) => {
//   if (!userId || !token) {
//     throw new ApiError(400, "User ID and token are required");
//   }

//   await deleteRefreshToken(userId, token);

//   return true;
// };

// export const verifyEmailService = async (token) => {
//   if (!token) {
//     throw new ApiError(400, "Verification token is required");
//   }

//   let decoded;

//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET);
//   } catch {
//     throw new ApiError(400, "Invalid or expired token");
//   }

//   const isValid = await isVerifyTokenValid(decoded.id, token);

//   if (!isValid) {
//     throw new ApiError(400, "Token already used or invalid");
//   }

//   const user = await User.findById(decoded.id);

//   if (!user) throw new ApiError(404, "User not found");

//   if (user.isEmailVerified) {
//     throw new ApiError(400, "Email already verified");
//   }

//   user.isEmailVerified = true;
//   await user.save();

//   await deleteVerifyToken(decoded.id, token);

//   return true;
// };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.util.js";

import {
  saveRefreshToken,
  isRefreshTokenValid,
  deleteRefreshToken,
  isVerifyTokenValid,
  deleteVerifyToken,
} from "../../utils/authCache.js";

import Otp from "./otp.model.js";
import { generateOTP } from "../../utils/otp.js";
import { sendOtpEmail } from "../email/email.service.js";

//////////////////////////////////////////////////////////
// 🔐 1️⃣ PASSWORD LOGIN (ADMIN / SUB-ADMIN)
//////////////////////////////////////////////////////////

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  // Admin must verify email
  if (["admin", "sub-admin"].includes(user.role) && !user.isEmailVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken);

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, accessToken, refreshToken };
};

//////////////////////////////////////////////////////////
// 📲 2️⃣ SEND OTP LOGIN (PASSWORDLESS)
//////////////////////////////////////////////////////////

export const sendOtpLogin = async (email) => {
  if (!email) throw new ApiError(400, "Email is required");

  const otp = generateOTP();

  // remove old otp
  await Otp.findOneAndDelete({ email });

  await Otp.create({
    email,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  await sendOtpEmail(email, otp);

  return true;
};

//////////////////////////////////////////////////////////
// ✅ 3️⃣ VERIFY OTP LOGIN
//////////////////////////////////////////////////////////

export const verifyOtpLogin = async ({ email, otp }) => {
  if (!email || !otp)
    throw new ApiError(400, "Email and OTP required");

  const record = await Otp.findOne({ email, otp });
  if (!record) throw new ApiError(401, "Invalid OTP");

  if (record.expiresAt < Date.now())
    throw new ApiError(401, "OTP expired");

  let user = await User.findOne({ email });

  // Auto register if not exists
  if (!user) {
    user = await User.create({
      email,
      role: "user",
      isEmailVerified: true,
    });
  }

  await Otp.deleteMany({ email });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken);

  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, accessToken, refreshToken };
};

//////////////////////////////////////////////////////////
// 🔄 4️⃣ REFRESH ACCESS TOKEN
//////////////////////////////////////////////////////////

export const refreshAccessToken = async (token) => {
  if (!token) throw new ApiError(401, "Refresh token missing");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const isValid = await isRefreshTokenValid(decoded.id, token);
  if (!isValid) throw new ApiError(401, "Invalid refresh token");

  // rotate token
  await deleteRefreshToken(decoded.id, token);

  const newAccessToken = generateAccessToken(decoded);
  const newRefreshToken = generateRefreshToken(decoded);

  await saveRefreshToken(decoded.id, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

//////////////////////////////////////////////////////////
// 🚪 5️⃣ LOGOUT USER
//////////////////////////////////////////////////////////

export const logoutUser = async (userId, token) => {
  if (!userId || !token) {
    throw new ApiError(400, "User ID and token are required");
  }

  await deleteRefreshToken(userId, token);
  return true;
};

//////////////////////////////////////////////////////////
// 📧 6️⃣ VERIFY EMAIL (LINK BASED)
//////////////////////////////////////////////////////////

export const verifyEmailService = async (token) => {
  if (!token) throw new ApiError(400, "Verification token is required");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(400, "Invalid or expired token");
  }

  const isValid = await isVerifyTokenValid(decoded.id, token);
  if (!isValid) throw new ApiError(400, "Token already used or invalid");

  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(404, "User not found");

  if (user.isEmailVerified)
    throw new ApiError(400, "Email already verified");

  user.isEmailVerified = true;
  await user.save();

  await deleteVerifyToken(decoded.id, token);

  return true;
};