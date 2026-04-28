const otpStore = new Map(); 

// 🔹 Generate OTP
export const sendOTPService = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore.set(mobile, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  });

  console.log(`OTP for ${mobile}: ${otp}`);

  return true;
};

// 🔹 Verify OTP
export const verifyOTPService = async (mobile, otp) => {
  const record = otpStore.get(mobile);

  if (!record) {
    throw new Error("OTP not found");
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(mobile);
    throw new Error("OTP expired");
  }

  if (record.otp !== Number(otp)) {
    throw new Error("Invalid OTP");
  }

  otpStore.delete(mobile);

  return true;
};