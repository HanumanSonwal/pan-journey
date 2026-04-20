// import express from "express";
// import { getMe, login, logout, refreshToken, verifyEmail } from "./auth.controller.js";
// import { validate } from "../../middleware/validate.middleware.js";
// import { loginValidation } from "./auth.validation.js";
// import { protect } from "../../middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/login", validate(loginValidation), login);
// router.post("/refresh-token", refreshToken);
// router.get("/me", protect, getMe);
// router.post("/logout", protect, logout);
// router.get("/verify-email", verifyEmail);

// export default router;

import express from "express";
import {
  getMe,
  login,
  logout,
  refreshToken,
  verifyEmail,
  sendOtp,
  verifyOtp,
} from "./auth.controller.js";

import { validate } from "../../middleware/validate.middleware.js";
import { loginValidation } from "./auth.validation.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// 🔐 Admin password login
router.post("/login", validate(loginValidation), login);

// 📲 OTP LOGIN ROUTES (users)
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// 🔄 Refresh token
router.post("/refresh-token", refreshToken);

// 👤 Current user
router.get("/me", protect, getMe);

// 🚪 Logout
router.post("/logout", protect, logout);

// 📧 Email verification link
router.get("/verify-email", verifyEmail);

export default router;