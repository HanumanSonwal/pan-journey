"use client";

import { Controller, useFormContext } from "react-hook-form";
import AppSelect from "./AppSelect";

export default function RHFSelect({ name, ...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AppSelect
          {...field}
          {...props}
          value={field.value || undefined}
          onChange={(value) => field.onChange(value)}
          error={errors?.[name]?.message}
        />
      )}
    />
  );
}
