"use client";

import dayjs from "dayjs";

import { Controller, useFormContext } from "react-hook-form";
import AppDatePicker from "../inputs/AppDatePicker";

export default function RHFDatePicker({ name, ...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AppDatePicker
          {...props}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? date.toISOString() : null)}
          error={errors?.[name]?.message}
        />
      )}
    />
  );
}
