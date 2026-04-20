// import {
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   verifyEmailService,
// } from "./auth.service.js";

// import { sendSuccess } from "../../utils/ApiResponse.js";
// import { asyncHandler } from "../../middleware/asyncHandler.js";

// export const login = asyncHandler(async (req, res) => {
//   const data = await loginUser(req.body);

//   res.cookie("accessToken", data.accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 15 * 60 * 1000,
//   });

//   res.cookie("refreshToken", data.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   sendSuccess(res, "Login successful", {
//     user: {
//       id: data.user._id,
//       name: data.user.name,
//       email: data.user.email,
//       role: data.user.role,
//       Permissions: data.user.permissions,
//       ismobileverified: data.user.isMobileVerified,
//       isEmailVerified: data.user.isEmailVerified,
//       createdAt: data.user.createdAt,
//       updatedAt: data.user.updatedAt,
//     },
//   });
// });

// export const refreshToken = asyncHandler(async (req, res) => {
//   const token = req.cookies?.refreshToken;

//   if (!token) {
//     const error = new Error("Refresh token missing");
//     error.statusCode = 401;
//     throw error;
//   }

//   const { accessToken, refreshToken } = await refreshAccessToken(token);

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 15 * 60 * 1000,
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   sendSuccess(res, "Access token refreshed", {});
// });

// export const getMe = asyncHandler(async (req, res) => {
//   sendSuccess(res, "Profile fetched", req.user);
// });

// export const logout = asyncHandler(async (req, res) => {
//   const token = req.cookies?.refreshToken;

//   await logoutUser(req.user._id, token);

//   res.clearCookie("refreshToken");
//   res.clearCookie("accessToken");

//   sendSuccess(res, "Logged out successfully");
// });

// export const verifyEmail = asyncHandler(async (req, res) => {
//   const { token } = req.query;

//   await verifyEmailService(token);

//   sendSuccess(res, "Email verified successfully");
// });
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyEmailService,
  sendOtpLogin,
  verifyOtpLogin,
} from "./auth.service.js";

import { sendSuccess } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

////////////////////////////////////////////////////////////
// 🔐 PASSWORD LOGIN (ADMIN / SUB-ADMIN)
////////////////////////////////////////////////////////////
export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);

  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, "Login successful", {
    user: {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      Permissions: data.user.permissions,
      ismobileverified: data.user.isMobileVerified,
      isEmailVerified: data.user.isEmailVerified,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
    },
  });
});

////////////////////////////////////////////////////////////
// 📲 SEND OTP (USER LOGIN)
////////////////////////////////////////////////////////////
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await sendOtpLogin(email);

  sendSuccess(res, "OTP sent successfully");
});

////////////////////////////////////////////////////////////
// ✅ VERIFY OTP LOGIN (USER LOGIN)
////////////////////////////////////////////////////////////
export const verifyOtp = asyncHandler(async (req, res) => {
  const data = await verifyOtpLogin(req.body);

  res.cookie("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, "Login successful", {
    user: {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      Permissions: data.user.permissions,
      ismobileverified: data.user.isMobileVerified,
      isEmailVerified: data.user.isEmailVerified,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
    },
  });
});

////////////////////////////////////////////////////////////
// 🔄 REFRESH ACCESS TOKEN
////////////////////////////////////////////////////////////
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    const error = new Error("Refresh token missing");
    error.statusCode = 401;
    throw error;
  }

  const { accessToken, refreshToken } = await refreshAccessToken(token);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, "Access token refreshed", {});
});

////////////////////////////////////////////////////////////
// 👤 GET CURRENT USER PROFILE
////////////////////////////////////////////////////////////
export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, "Profile fetched", req.user);
});

////////////////////////////////////////////////////////////
// 🚪 LOGOUT
////////////////////////////////////////////////////////////
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  await logoutUser(req.user._id, token);

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  sendSuccess(res, "Logged out successfully");
});

////////////////////////////////////////////////////////////
// 📧 VERIFY EMAIL (LINK)
////////////////////////////////////////////////////////////
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  await verifyEmailService(token);

  sendSuccess(res, "Email verified successfully");
});