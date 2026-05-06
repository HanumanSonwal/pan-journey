"use client";

import { EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";

// 🔥 Schema
const schema = z.object({
  passportNumber: z.string().optional(),
  passportExpiry: z.any().optional(),
  issuingCountry: z.string().optional(),
  panNumber: z.string().optional(),
});

export default function DocumentsTab() {
  const [isEdit, setIsEdit] = useState(false);

  // 👉 future API data (placeholder)
  const userDocs = null;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      passportNumber: "",
      passportExpiry: null,
      issuingCountry: "",
      panNumber: "",
    },
  });

  // ✅ Load API data later
  useEffect(() => {
    if (!userDocs) return;

    reset({
      passportNumber: userDocs.passportNumber || "",
      passportExpiry: userDocs.passportExpiry
        ? dayjs(userDocs.passportExpiry)
        : null,
      issuingCountry: userDocs.issuingCountry || "",
      panNumber: userDocs.panNumber || "",
    });
  }, [userDocs, reset]);

  // ✅ Submit
  const onSubmit = (data) => {
    console.log("📦 Documents Data:", data);

    // 👉 future API
    // updateDocuments.mutate({...})

    setIsEdit(false);
  };

  // 🔹 Common Field UI (same as profile)
  const Field = ({ label, field, children }) => (
    <div>
      <p className="text-gray-700 text-[14px] font-medium">{label}</p>

      {isEdit ? (
        children
      ) : (
        <p className="text-gray-900 font-semibold mt-1">
          {field?.value
            ? field.value.format?.("DD MMM YYYY") || field.value
            : (
              <span className="text-[#4A9BB5] underline cursor-pointer">
                Add Detail
              </span>
            )}
        </p>
      )}
    </div>
  );

  return (
    <div className=" rounded-xl text-gray-900 shadow p-6">
      <h2 className="text-[22px] font-semibold">My Profile</h2>

      <Divider />

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Personal Information</h3>

        {!isEdit && (
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsEdit(true)}
          >
            Edit Details
          </Button>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-6">

          {/* PASSPORT NUMBER */}
          <Controller
            name="passportNumber"
            control={control}
            render={({ field }) => (
              <Field label="Passport No." field={field}>
                <Input {...field} size="large" />
              </Field>
            )}
          />

          {/* PASSPORT EXPIRY */}
          <Controller
            name="passportExpiry"
            control={control}
            render={({ field }) => (
              <Field label="Expiry Date" field={field}>
                <DatePicker
                  className="w-full"
                  size="large"
                  value={field.value || null}
                  onChange={(d) => field.onChange(d)}
                />
              </Field>
            )}
          />

          {/* ISSUING COUNTRY */}
          <Controller
            name="issuingCountry"
            control={control}
            render={({ field }) => (
              <Field label="Issuing Country" field={field}>
                <Select
                  {...field}
                  className="w-full"
                  size="large"
                  placeholder="Select Country"
                  options={[
                    { value: "India", label: "India" },
                    { value: "USA", label: "USA" },
                  ]}
                  value={field.value || undefined}
                  onChange={(v) => field.onChange(v)}
                />
              </Field>
            )}
          />

          {/* PAN NUMBER */}
          <Controller
            name="panNumber"
            control={control}
            render={({ field }) => (
              <Field label="Pan Card Number" field={field}>
                <Input {...field} size="large" />
              </Field>
            )}
          />
        </div>

        {/* ACTION */}
        {isEdit && (
          <div className="mt-6 flex gap-3">
            <Button onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}