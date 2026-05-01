"use client";

import { useRef } from "react";

export default function OtpInput({ length = 6, value = "", onChange }) {
  const inputs = useRef([]);

  // 🔹 Update full OTP value
  const updateOtp = () => {
    const otp = inputs.current.map((i) => i?.value || "").join("");
    onChange?.(otp);
  };

  // 🔹 Handle typing
  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;

    if (val && i < length - 1) {
      inputs.current[i + 1]?.focus();
    }

    updateOtp();
  };

  // 🔹 Handle backspace
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (!inputs.current[i].value && i > 0) {
        inputs.current[i - 1]?.focus();
      }
    }
  };

  // 🔥 Handle paste (MAIN FIX)
  const handlePaste = (e) => {
    e.preventDefault();

    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    pasteData.split("").forEach((digit, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = digit;
      }
    });

    updateOtp();

    // focus last filled
    const lastIndex = pasteData.length - 1;
    if (lastIndex >= 0 && inputs.current[lastIndex]) {
      inputs.current[lastIndex].focus();
    }
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 text-center text-[18px] font-medium
                     border border-gray-300 rounded-lg outline-none
                     focus:border-[#4A9BB5] focus:ring-2 focus:ring-[#4A9BB5]/20
                     transition-all"
        />
      ))}
    </div>
  );
}
