"use client";

import { Controller, useFormContext } from "react-hook-form";

export default function RHFTextarea({ name, label, rows = 5, className = "" }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <textarea
            {...field}
            rows={rows}
            placeholder=" "
            className={`w-full resize-none rounded-md border p-4 outline-none ${
              errors?.[name]
                ? "border-red-500"
                : "border-gray-300 focus:border-[#0f6b78]"
            } ${className}`}
          />

          <label className="mb-1 block text-sm text-gray-500">{label}</label>

          {errors?.[name] && (
            <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>
          )}
        </div>
      )}
    />
  );
}
