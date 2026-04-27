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
    onChange(otp);
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          className="w-10 h-10 text-center text-lg border rounded"
          ref={(el) => (inputs.current[i] = el)}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}