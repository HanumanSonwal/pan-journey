"use client";

import { useRef } from "react";

export default function OtpInput({ onChange }) {
  const inputs = useRef([]);

  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;

    if (val && i < 5) {
      inputs.current[i + 1]?.focus();
    }

    updateOtp();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !inputs.current[i].value && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    paste.split("").forEach((digit, i) => {
      if (inputs.current[i]) {
        inputs.current[i].value = digit;
      }
    });

    updateOtp();
  };

  const updateOtp = () => {
    const otp = inputs.current.map((input) => input?.value || "").join("");
    onChange?.(otp);
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 text-center text-[18px] font-medium font-roboto 
                     border border-gray-300 rounded-lg outline-none
                     focus:border-[#4A9BB5] focus:ring-2 focus:ring-[#4A9BB5]/20
                     transition-all"
        />
      ))}
    </div>
  );
}
