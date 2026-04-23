import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  verifyEmailService,
} from "./auth.service.js";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/ApiResponse.js";


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
      ...data.user,
      role: data.role,
      permissions: data.permissions,
    },
  });
});

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
//import { mapUserResponse } from "../../utils/user.mapper.js";
const mapUserResponse = (user, permissions = []) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role?.name || null,
    permissions,
  };
};
export const getMe = asyncHandler(async (req, res) => {
  const permissions =
    req.user?.role?.permissions?.map((p) => p.name) || [];

  sendSuccess(res, "Profile fetched", {
    user: mapUserResponse(req.user, permissions),
  });
});
// export const getMe = asyncHandler(async (req, res) => {
//   sendSuccess(res, "Profile fetched", { user: req.user });
// });

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  await logoutUser(req.user._id, token);

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  sendSuccess(res, "Logged out successfully");
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  await verifyEmailService(token);

  sendSuccess(res, "Email verified successfully");
});
