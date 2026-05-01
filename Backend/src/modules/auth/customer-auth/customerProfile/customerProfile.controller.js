import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import {
  sendSuccess,
  sendError,
} from "../../../../utils/response/ApiResponse.js";

import { completeProfileService } from "./customerProfile.service.js";

export const completeProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // 🔥 IMPORTANT (from auth middleware)

  const { name, email, mobile } = req.body;

  if (!name) {
    return sendError(res, "Name is required", 400);
  }

  const user = await completeProfileService(userId, {
    name,
    email,
    mobile,
  });

  return sendSuccess(res, "Profile updated successfully", {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    profileCompleted: user.profileCompleted,
  });
});