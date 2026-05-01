import { normalizeMobile } from "../../../../utils/normalizeMobile.js";

const otpStore = new Map();

export const sendOTPService = async (mobile) => {
  const normalizedMobile = normalizeMobile(mobile);

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore.set(normalizedMobile, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  console.log(`OTP for ${normalizedMobile}: ${otp}`);

  return true;
};

// 🔹 Verify OTP
export const verifyOTPService = async (mobile, otp) => {
  const normalizedMobile = normalizeMobile(mobile);

  const record = otpStore.get(normalizedMobile);

  if (!record) {
    throw new Error("OTP not found");
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(normalizedMobile);
    throw new Error("OTP expired");
  }

  if (record.otp !== Number(otp)) {
    throw new Error("Invalid OTP");
  }

  otpStore.delete(normalizedMobile);

  return true;
};
