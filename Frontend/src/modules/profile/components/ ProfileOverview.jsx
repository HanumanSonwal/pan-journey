"use client";

import { CheckCircleFilled, EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  useProfile,
  useSendEmailOtp,
  useSendMobileOtp,
  useUpdateProfile,
  useVerifyEmail,
  useVerifyMobile,
} from "../hooks/useProfile";

// ✅ SCHEMA
const schema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().optional(),
  gender: z.string().min(1, "Select gender"),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  nationality: z.string().nullable().optional(),
  maritalStatus: z.string().nullable().optional(),
  dateOfBirth: z.any().nullable().optional(),
  anniversary: z.any().nullable().optional(),
});

export default function ProfileOverview() {
  const { data: user } = useProfile();
  console.log("🚀 USER-data:", user);
  const updateProfile = useUpdateProfile();
  const sendEmailOtp = useSendEmailOtp();
  const verifyEmail = useVerifyEmail();
  const sendMobileOtp = useSendMobileOtp();
  const verifyMobile = useVerifyMobile();
  const [isEdit, setIsEdit] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [showMobileOtp, setShowMobileOtp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);

  // ✅ FIXED useForm
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      mobile: "",
      city: "",
      state: "",
      dateOfBirth: null,
      anniversary: null,
      nationality: "",
      maritalStatus: "",
    },
  });

  // ✅ FIXED splitName
  const splitName = (fullName) => {
    if (!fullName) return { firstName: "", lastName: "" };

    const parts = fullName.trim().split(/\s+/);

    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" "),
    };
  };

  // ✅ FIXED reset usage
  useEffect(() => {
    if (!user) return;

    const { firstName, lastName } = splitName(user.name);

    reset({
      firstName,
      lastName,
      gender: user.gender || "",
      email: user.email || "",
      mobile: user.mobile || "",
      city: user?.city || "",
      state: user?.state || "",
      nationality: user.nationality || "",

      // 🔥 IMPORTANT FIX
      dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
      anniversary: user.anniversary ? dayjs(user.anniversary) : null,

      maritalStatus: user.maritalStatus || "",
    });
  }, [user, reset]);

  // ✅ SUBMIT

  const buildPayload = (data, user) => {
    return {
      name: [data.firstName, data.lastName].filter(Boolean).join(" "),

      email: data.email,
      mobile: data.mobile,
      gender: data.gender,

      city: data?.city,
      state: data?.state,

      nationality: data.nationality || null,
      maritalStatus: data.maritalStatus || null,

      // ✅ DATE FIX (most important)
      dateOfBirth: data.dateOfBirth
        ? dayjs(data.dateOfBirth).toISOString()
        : user?.dateOfBirth || null,

      anniversary: data.anniversary
        ? dayjs(data.anniversary).toISOString()
        : user?.anniversary || null,
    };
  };
  const onSubmit = (data) => {
    const payload = buildPayload(data, user);

    console.log("🚀 FINAL PAYLOAD:", payload);

    updateProfile.mutate(payload);

    setIsEdit(false);
  };

  // ✅ WATCHERS
  const email = useWatch({ control, name: "email" });
  const mobile = useWatch({ control, name: "mobile" });

  useEffect(() => {
    setEmailVerified(false);
    setEmailOtp("");
    setShowEmailOtp(false);
  }, [email]);

  useEffect(() => {
    setMobileVerified(false);
    setMobileOtp("");
    setShowMobileOtp(false);
  }, [mobile]);

  // ✅ FIELD COMPONENT
  const Field = ({ label, field, children, type }) => {
    return (
      <div>
        <p className="text-[14px] font-medium text-gray-700">{label}</p>

        {isEdit ? (
          children
        ) : (
          <p className="mt-1 font-semibold text-gray-900">
            {field?.value
              ? type === "date"
                ? dayjs(field.value).format("DD MMM YYYY")
                : field.value.toString()
              : "-"}
          </p>
        )}
      </div>
    );
  };

  return (
<>
      {/* 🔹 Heading */}
      <div className="flex items-center justify-between bg-white py-4 px-6 text-gray-900">
        <h2 className="mb-0! text-[22px] font-bold text-gray-900">
          My Profile
        </h2>
      </div>

      {/* <Divider /> */}
    <div className="rounded-xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      {/* 🔹 PERSONAL INFO */}
      <div className="mb-4 flex items-center justify-between text-gray-900">
        <h3 className="text-[16px] font-semibold">Personal Information</h3>

        {!isEdit && (
          <Button icon={<EditOutlined />} onClick={() => setIsEdit(true)}>
            Edit Details
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Field label="First Name" field={field} isEdit={isEdit}>
                  <Input {...field} size="large" disabled={!isEdit} />
                </Field>
              )}
            />
            <p className="text-xs text-red-500">{errors.firstName?.message}</p>
          </div>

          <div>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Field label="Last Name" field={field} isEdit={isEdit}>
                  <Input {...field} size="large" disabled={!isEdit} />
                </Field>
              )}
            />
            <p className="text-xs text-red-500">{errors.lastName?.message}</p>
          </div>
          <div>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Field label="Gender" field={field} isEdit={isEdit}>
                  <Select
                    {...field}
                    className="w-full"
                    size="large"
                    placeholder="Select Gender"
                    disabled={!isEdit}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />
                </Field>
              )}
            />
            <p className="text-xs text-red-500">{errors.gender?.message}</p>
          </div>
          <div>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Field
                  label="Date Of Birth"
                  type="date"
                  field={field}
                  isEdit={isEdit}
                >
                  <DatePicker
                    className="w-full"
                    size="large"
                    value={field.value || null}
                    onChange={(date) => field.onChange(date)}
                    disabled={!isEdit}
                  />
                </Field>
              )}
            />
            <p className="text-xs text-red-500">
              {errors.dateOfBirth?.message}
            </p>
          </div>
          <div>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Field label="Nationality" field={field} isEdit={isEdit}>
                  <Select
                    className="w-full"
                    size="large"
                    placeholder="Select Country"
                    disabled={!isEdit}
                    options={[
                      { value: "India", label: "India" },
                      { value: "USA", label: "USA" },
                    ]}
                    value={field.value || undefined}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />
            <p className="text-xs text-red-500">
              {errors.nationality?.message}
            </p>
          </div>
          <div>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <Field label="Marital Status" field={field} isEdit={isEdit}>
                  <Select
                    {...field}
                    className="w-full"
                    size="large"
                    placeholder="Select Status"
                    disabled={!isEdit}
                    options={[
                      { value: "Single", label: "Single" },
                      { value: "Married", label: "Married" },
                    ]}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value)}
                  />
                </Field>
              )}
            />

            <p className="text-xs text-red-500">
              {errors.maritalStatus?.message}
            </p>
          </div>

          <div>
            <Controller
              name="anniversary"
              control={control}
              render={({ field }) => (
                <Field
                  label="Anniversary"
                  type="date"
                  field={field}
                  isEdit={isEdit}
                >
                  <DatePicker
                    className="w-full"
                    size="large"
                    value={field.value || null} // now already dayjs
                    onChange={(date) => field.onChange(date)} // store dayjs
                    format="DD MMM YYYY"
                    disabled={!isEdit}
                  />
                </Field>
              )}
            />

            <p className="text-xs text-red-500">
              {errors.anniversary?.message}
            </p>
          </div>
          <div>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Field label="City" field={field} isEdit={isEdit}>
                  <Select
                    {...field}
                    className="w-full"
                    size="large"
                    placeholder="Select City"
                    disabled={!isEdit}
                    options={[
                      { value: "Jaipur", label: "Jaipur" },
                      { value: "Delhi", label: "Delhi" },
                    ]}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value)}
                  />
                </Field>
              )}
            />

            <p className="text-xs text-red-500">{errors?.city?.message}</p>
          </div>

          <div>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Field label="State" field={field} isEdit={isEdit}>
                  <Select
                    {...field}
                    className="w-full"
                    size="large"
                    placeholder="Select State"
                    disabled={!isEdit}
                    options={[
                      { value: "Rajasthan", label: "Rajasthan" },
                      { value: "Delhi", label: "Delhi" },
                    ]}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value)}
                  />
                </Field>
              )}
            />

            <p className="text-xs text-red-500">{errors.state?.message}</p>
          </div>
        </div>

        <Divider />

        {/* 🔹 CONTACT */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-gray-900">
            Contact Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* EMAIL */}

          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field label="Email" field={field} isEdit={isEdit}>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      className="w-full"
                      size="large"
                      disabled={!isEdit}
                    />

                    <Button
                      disabled={emailVerified}
                      onClick={() => {
                        const email = getValues("email");
                        if (!email) return;

                        sendEmailOtp.mutate({ email });
                        setShowEmailOtp(true);
                      }}
                    >
                      Verify
                    </Button>

                    {emailVerified && (
                      <CheckCircleFilled className="text-lg text-green-500" />
                    )}
                  </div>
                </Field>
              )}
            />

            {/* OTP INPUT */}
            {showEmailOtp && (
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="6 digit OTP"
                  maxLength={6}
                  value={emailOtp}
                  onChange={(e) =>
                    setEmailOtp(e.target.value.replace(/\D/g, ""))
                  }
                />

                <Button
                  onClick={() => {
                    if (emailOtp.length !== 6) {
                      return alert("Enter valid 6 digit OTP");
                    }

                    verifyEmail.mutate(
                      {
                        email: getValues("email"),
                        otp: emailOtp,
                      },
                      {
                        onSuccess: () => {
                          setEmailVerified(true);
                          setShowEmailOtp(false);
                        },
                      },
                    );
                  }}
                >
                  OK
                </Button>
              </div>
            )}

            <p className="text-xs text-red-500">{errors.email?.message}</p>
          </div>

          {/* MOBILE */}
          <div>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Field label="Mobile No." field={field} isEdit={isEdit}>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      className="w-full"
                      size="large"
                      disabled={!isEdit}
                      maxLength={10}
                      value={field.value || ""} // ✅ important
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/\D/g, ""))
                      }
                    />

                    <Button
                      disabled={mobileVerified}
                      onClick={() => {
                        const mobile = getValues("mobile");
                        if (!mobile || mobile.length !== 10) {
                          return alert("Enter valid 10 digit mobile number");
                        }

                        sendMobileOtp.mutate({ mobile });
                        setShowMobileOtp(true);
                      }}
                    >
                      Verify
                    </Button>

                    {mobileVerified && (
                      <CheckCircleFilled className="text-lg text-green-500" />
                    )}
                  </div>
                </Field>
              )}
            />

            {/* OTP INPUT */}
            {showMobileOtp && (
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="6 digit OTP"
                  maxLength={6}
                  value={mobileOtp}
                  onChange={(e) =>
                    setMobileOtp(e.target.value.replace(/\D/g, ""))
                  }
                />

                <Button
                  onClick={() => {
                    if (mobileOtp.length !== 6) {
                      return alert("Enter valid 6 digit OTP");
                    }

                    verifyMobile.mutate(
                      {
                        mobile: getValues("mobile"),
                        otp: mobileOtp,
                      },
                      {
                        onSuccess: () => {
                          setMobileVerified(true);
                          setShowMobileOtp(false);
                        },
                      },
                    );
                  }}
                >
                  OK
                </Button>
              </div>
            )}

            <p className="text-xs text-red-500">{errors.mobile?.message}</p>
          </div>
        </div>
      </form>

      {/* ACTION */}
      {isEdit && (
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            style={{
              background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
            }}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
    </>
  );
}
