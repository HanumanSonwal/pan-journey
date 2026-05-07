"use client";

import {
  Controller,
  useFormContext,
} from "react-hook-form";

import AppInput from "../ui/AppInput";

export default function RHFInput({
  name,
  transform,
  ...props
}) {

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}

      render={({ field }) => {

        return (
          <AppInput
            {...field}
            {...props}

            value={field.value || ""}

            onChange={(e) => {

              let value =
                e.target.value;

              // OPTIONAL TRANSFORM
              if (transform) {

                value =
                  transform(value);
              }

              field.onChange(value);
            }}

            error={
              errors?.[name]?.message
            }
          />
        );
      }}
    />
  );
}