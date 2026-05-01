"use client";

import { Input } from "antd";
import { forwardRef, useEffect, useState } from "react";

const AppInput = forwardRef(
  ({ label, error, value = "", onChange, type = "text", ...rest }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const isActive = focused || hasValue;

    return (
      <div className="w-full">
        <div className="relative">
          {/* INPUT */}
          <Input
            ref={ref}
            value={value}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              onChange?.(e);
            }}
            type={type}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setHasValue(!!e.target.value);
            }}
            className={`!h-[56px] !rounded-xl !px-4 !pt-5 !pb-2 !text-[16px]
              ${error ? "!border-red-500" : ""}`}
            {...rest}
          />

          {/* LABEL */}
          <label
            className={`absolute left-3 transition-all duration-200 pointer-events-none z-10
              ${
                isActive
                  ? "-top-2 text-[11px] text-[#4A9BB5]"
                  : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
              }`}
            style={{
              background: "#fff", // ✅ clean cut
              padding: "0 4px", // ✅ border hide
            }}
          >
            {label}
          </label>
        </div>

        {/* ERROR */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

AppInput.displayName = "AppInput";
export default AppInput;
