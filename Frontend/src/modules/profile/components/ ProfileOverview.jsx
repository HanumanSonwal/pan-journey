"use client";

import { CheckCircleFilled, EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Divider, Input, Select } from "antd";
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
});

export default function ProfileOverview() {
  const { data: user } = useProfile();

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
      dob: null,
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
      city: user.city || "",
      state: user.state || "",
      dob: user.dob || null,
      anniversary: user.anniversary || null,
      nationality: user.nationality || "",
      maritalStatus: user.maritalStatus || "",
    });
  }, [user, reset]);

  // ✅ SUBMIT
  const onSubmit = (data) => {
    const fullName = [data.firstName, data.lastName].join(" ");

    updateProfile.mutate({
      name: fullName,
      email: data.email,
      mobile: data.mobile,
      dob: data.dob ? data.dob.format("YYYY-MM-DD") : null,
      anniversary: data.anniversary
        ? data.anniversary.format("YYYY-MM-DD")
        : null,
    });

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
  const Field = ({ label, field, children }) => (
    <div>
      <p className="text-gray-700 text-[14px] font-medium">{label}</p>

      {isEdit ? (
        children
      ) : (
        <p className="text-gray-900 font-semibold mt-1">
          {field?.value?.toString().trim() || "-"}
        </p>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6">
      {/* 🔹 Heading */}
      <h2 className="text-[22px] font-semibold text-black">My Profile</h2>

      <Divider />

      {/* 🔹 PERSONAL INFO */}
      <div className="flex justify-between items-center mb-4 text-gray-900">
        <h3 className="font-semibold text-[16px]">Personal Information</h3>

        {!isEdit && (
          <Button icon={<EditOutlined />} onClick={() => setIsEdit(true)}>
            Edit Details
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
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
            <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
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
            <p className="text-red-500 text-xs">{errors.gender?.message}</p>
          </div>
          <div>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Field label="Date Of Birth" field={field} isEdit={isEdit}>
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
            <p className="text-red-500 text-xs">{errors.dob?.message}</p>
          </div>
          <div>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Field label="Nationality" field={field} isEdit={isEdit}>
                  <Select
                    {...field}
                    className="w-full"
                    size="large"
                    placeholder="Select Country"
                    disabled={!isEdit}
                    options={[
                      { value: "India", label: "India" },
                      { value: "USA", label: "USA" },
                    ]}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value)}
                  />
                </Field>
              )}
            />
            <p className="text-red-500 text-xs">
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

            <p className="text-red-500 text-xs">
              {errors.maritalStatus?.message}
            </p>
          </div>
          <div>
            <Controller
              name="anniversary"
              control={control}
              render={({ field }) => (
                <Field label="Anniversary" field={field} isEdit={isEdit}>
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
            <p className="text-red-500 text-xs">
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

            <p className="text-red-500 text-xs">{errors.city?.message}</p>
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

            <p className="text-red-500 text-xs">{errors.state?.message}</p>
          </div>
        </div>

        <Divider />

        {/* 🔹 CONTACT */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-[16px] text-gray-900">
            Contact Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EMAIL */}

          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field label="Email" field={field} isEdit={isEdit}>
                  <div className="flex gap-2 items-center">
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
                      <CheckCircleFilled className="text-green-500 text-lg" />
                    )}
                  </div>
                </Field>
              )}
            />

            {/* OTP INPUT */}
            {showEmailOtp && (
              <div className="flex gap-2 mt-2">
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

            <p className="text-red-500 text-xs">{errors.email?.message}</p>
          </div>

          {/* MOBILE */}
          <div>
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <Field label="Mobile No." field={field} isEdit={isEdit}>
                  <div className="flex gap-2 items-center">
                    <Input
                      {...field}
                      className="w-full"
                      size="large"
                      disabled={!isEdit}
                      maxLength={10}
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
                      <CheckCircleFilled className="text-green-500 text-lg" />
                    )}
                  </div>
                </Field>
              )}
            />

            {/* OTP INPUT */}
            {showMobileOtp && (
              <div className="flex gap-2 mt-2">
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

            <p className="text-red-500 text-xs">{errors.mobile?.message}</p>
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
  );
}
