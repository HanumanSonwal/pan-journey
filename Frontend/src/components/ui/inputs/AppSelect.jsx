"use client";

import { Select } from "antd";

export default function AppSelect({ error, ...props }) {
  return (
    <div className="w-full">
      <Select
        size="large"
        className={`custom-select w-full ${error ? "select-error" : ""} `}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
