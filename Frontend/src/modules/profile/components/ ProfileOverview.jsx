"use client";

import {
  CheckCircleFilled,
  EditOutlined,
} from "@ant-design/icons";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Divider,
  Input,
  message,
} from "antd";

import dayjs from "dayjs";

import {
  useEffect,
  useState,
} from "react";

import {
  FormProvider,
  useForm,
  useWatch,
} from "react-hook-form";

import { z } from "zod";

import RHFDatePicker from "@/components/ui/RHFinputs/RHFDatePicker";
import RHFInput from "@/components/ui/RHFinputs/RHFInput";
import RHFSelect from "@/components/ui/RHFinputs/RHFSelect";

import { api } from "@/services/axios";

import {
  useProfile,
  useSendEmailOtp,
  useSendMobileOtp,
  useUpdateProfile,
  useVerifyEmail,
  useVerifyMobile,
} from "../hooks/useProfile";

// ================= SCHEMA =================

const schema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name required"),

  lastName: z.string().optional(),

  gender: z
    .string()
    .min(1, "Select gender"),

  // ✅ EMAIL FIX
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  // ✅ MOBILE FIX
  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Invalid mobile number"
    ),

  city: z
    .string()
    .min(1, "City required"),

  state: z
    .string()
    .min(1, "State required"),

  nationality: z
    .string()
    .nullable()
    .optional(),

  maritalStatus: z
    .string()
    .nullable()
    .optional(),

  dateOfBirth: z
    .any()
    .nullable()
    .optional(),

  anniversary: z
    .any()
    .nullable()
    .optional(),
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

  const [showEmailOtp, setShowEmailOtp] =
    useState(false);

  const [showMobileOtp, setShowMobileOtp] =
    useState(false);

  const [emailVerified, setEmailVerified] =
    useState(false);

  const [mobileVerified, setMobileVerified] =
    useState(false);

  // ================= CITY / STATE OPTIONS =================

  const [cityOptions, setCityOptions] =
    useState([]);

  const [stateOptions, setStateOptions] =
    useState([]);

  // ================= FORM =================

  const methods = useForm({
    resolver: zodResolver(schema),

    mode: "onSubmit",

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

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = methods;

  // ================= API CALL =================

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const stateRes =
          await api.get("/states");

        const formattedStates =
          stateRes?.data?.map((item) => ({
            label: item?.name,
            value: item?.name,
          })) || [];

        setStateOptions(formattedStates);

        const cityRes =
          await api.get("/cities");

        const formattedCities =
          cityRes?.data?.map((item) => ({
            label: item?.name,
            value: item?.name,
          })) || [];

        setCityOptions(formattedCities);
      } catch (error) {
        console.log(
          "LOCATION API ERROR",
          error
        );
      }
    };

    fetchLocations();
  }, []);

  // ================= SPLIT NAME =================

  const splitName = (fullName) => {
    if (!fullName) {
      return {
        firstName: "",
        lastName: "",
      };
    }

    const parts =
      fullName.trim().split(/\s+/);

    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" "),
    };
  };

  // ================= RESET DATA =================

  useEffect(() => {
    if (!user) return;

    const { firstName, lastName } =
      splitName(user.name);

    reset({
      firstName,
      lastName,

      gender: user.gender || "",

      email: user.email || "",

      mobile: user.mobile || "",

      city: user.city || "",

      state: user.state || "",

      nationality:
        user.nationality || "",

      maritalStatus:
        user.maritalStatus || "",

      dateOfBirth: user.dateOfBirth
        ? dayjs(user.dateOfBirth)
        : null,

      anniversary: user.anniversary
        ? dayjs(user.anniversary)
        : null,
    });
  }, [user, reset]);

  // ================= SUBMIT =================

  const buildPayload = (data, user) => {
    return {
      name: [
        data.firstName,
        data.lastName,
      ]
        .filter(Boolean)
        .join(" "),

      email: data.email,

      mobile: data.mobile,

      gender: data.gender,

      city: data.city,

      state: data.state,

      nationality:
        data.nationality || null,

      maritalStatus:
        data.maritalStatus || null,

      dateOfBirth: data.dateOfBirth
        ? dayjs(
            data.dateOfBirth
          ).toISOString()
        : user?.dateOfBirth || null,

      anniversary: data.anniversary
        ? dayjs(
            data.anniversary
          ).toISOString()
        : user?.anniversary || null,
    };
  };

  const onSubmit = (data) => {
    const payload = buildPayload(
      data,
      user
    );

    updateProfile.mutate(payload, {
      onSuccess: () => {
        message.success(
          "Profile updated successfully"
        );

        setIsEdit(false);
      },

      onError: () => {
        message.error(
          "Failed to update profile"
        );
      },
    });
  };

  // ================= CANCEL =================

  const handleCancel = () => {
    if (!user) return;

    const { firstName, lastName } =
      splitName(user.name);

    reset({
      firstName,
      lastName,

      gender: user.gender || "",

      email: user.email || "",

      mobile: user.mobile || "",

      city: user.city || "",

      state: user.state || "",

      nationality:
        user.nationality || "",

      maritalStatus:
        user.maritalStatus || "",

      dateOfBirth: user.dateOfBirth
        ? dayjs(user.dateOfBirth)
        : null,

      anniversary: user.anniversary
        ? dayjs(user.anniversary)
        : null,
    });

    setIsEdit(false);

    setEmailOtp("");
    setMobileOtp("");

    setShowEmailOtp(false);
    setShowMobileOtp(false);
  };

  // ================= WATCHERS =================

  const email = useWatch({
    control,
    name: "email",
  });

  const mobile = useWatch({
    control,
    name: "mobile",
  });

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

  // ================= VIEW FIELD =================

  const ViewField = ({
    label,
    value,
    type,
  }) => {
    return (
      <div className="space-y-[2px]">
        <p className="text-[14px] font-medium text-[#4b4b4b]">
          {label}
        </p>

        <p className="text-[16px] font-semibold text-[#1f1f1f]">
          {value ? (
            type === "date" ? (
              dayjs(value).format(
                "DD MMM YYYY"
              )
            ) : (
              value.toString()
            )
          ) : (
            <span className="text-[13px] font-medium text-[#63B3ED]">
              Add {label}
            </span>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <style jsx global>{`
        .edit-mode .ant-form-item-label {
          display: none !important;
        }

        .edit-mode .ant-form-item {
          margin-bottom: 14px !important;
        }

        .edit-mode
          .ant-form-item-explain-error {
          font-size: 12px !important;
          margin-top: 3px !important;
        }
      `}</style>

      <div className="bg-white p-5">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#1f1f1f]">
            Personal Information
          </h2>

          {!isEdit && (
            <Button
              icon={<EditOutlined />}
              onClick={() =>
                setIsEdit(true)
              }
              className="!h-[42px] !rounded-md !border-[#222] !px-5"
            >
              Edit Details
            </Button>
          )}
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              isEdit ? "edit-mode" : ""
            }
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">

              <div className="w-full">
                {isEdit ? (
                  <RHFInput
                    name="firstName"
                    label="First Name"
                  />
                ) : (
                  <ViewField
                    label="First Name"
                    value={getValues(
                      "firstName"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFInput
                    name="lastName"
                    label="Last Name"
                  />
                ) : (
                  <ViewField
                    label="Last Name"
                    value={getValues(
                      "lastName"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFSelect
                    name="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    options={[
                      {
                        label: "Male",
                        value: "Male",
                      },
                      {
                        label: "Female",
                        value: "Female",
                      },
                      {
                        label: "Other",
                        value: "Other",
                      },
                    ]}
                  />
                ) : (
                  <ViewField
                    label="Gender"
                    value={getValues(
                      "gender"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFDatePicker
                    name="dateOfBirth"
                    label="Birth Date"
                    placeholder="Select Birth Date"
                    disabledDate={(
                      current
                    ) =>
                      current &&
                      current >=
                        dayjs().endOf(
                          "day"
                        )
                    }
                    showToday={false}
                  />
                ) : (
                  <ViewField
                    label="Birth Date"
                    value={getValues(
                      "dateOfBirth"
                    )}
                    type="date"
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFSelect
                    name="nationality"
                    label="Nationality"
                    placeholder="Select Country"
                    options={[
                      {
                        label: "India",
                        value: "India",
                      },
                      {
                        label: "USA",
                        value: "USA",
                      },
                    ]}
                  />
                ) : (
                  <ViewField
                    label="Nationality"
                    value={getValues(
                      "nationality"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFSelect
                    name="maritalStatus"
                    label="Marital Status"
                    placeholder="Select Status"
                    options={[
                      {
                        label: "Single",
                        value: "Single",
                      },
                      {
                        label: "Married",
                        value: "Married",
                      },
                    ]}
                  />
                ) : (
                  <ViewField
                    label="Marital Status"
                    value={getValues(
                      "maritalStatus"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFDatePicker
                    name="anniversary"
                    label="Anniversary Date"
                    placeholder="Select Anniversary Date"
                    disabledDate={(
                      current
                    ) =>
                      current &&
                      current >
                        dayjs().endOf(
                          "day"
                        )
                    }
                    showToday={false}
                  />
                ) : (
                  <ViewField
                    label="Anniversary"
                    value={getValues(
                      "anniversary"
                    )}
                    type="date"
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFSelect
                    name="city"
                    label="City"
                    placeholder="Select City"
                    options={cityOptions}
                  />
                ) : (
                  <ViewField
                    label="City"
                    value={getValues(
                      "city"
                    )}
                  />
                )}
              </div>

              <div className="w-full">
                {isEdit ? (
                  <RHFSelect
                    name="state"
                    label="State"
                    placeholder="Select State"
                    options={stateOptions}
                  />
                ) : (
                  <ViewField
                    label="State"
                    value={getValues(
                      "state"
                    )}
                  />
                )}
              </div>
            </div>

            <Divider className="!my-8" />

            <div className="mb-6">
              <h2 className="text-[20px] font-semibold text-[#1f1f1f]">
                Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">

              {/* EMAIL */}

              <div className="w-full">
                {isEdit ? (
                  <>
                    <div className="flex items-end gap-2">
                      <div className="w-full">
                        <RHFInput
                          name="email"
                          label="Email"
                        />
                      </div>

                      <Button
                        type="default"
                        className="!h-[42px] !px-5"
                        disabled={
                          emailVerified
                        }
                        onClick={async () => {

                          // ✅ VALIDATION FIX

                          const valid =
                            await trigger(
                              "email"
                            );

                          if (!valid) return;

                          sendEmailOtp.mutate(
                            {
                              email:
                                getValues(
                                  "email"
                                ),
                            }
                          );

                          setShowEmailOtp(
                            true
                          );
                        }}
                      >
                        Verify
                      </Button>

                      {emailVerified && (
                        <CheckCircleFilled className="mb-3 text-lg text-green-500" />
                      )}
                    </div>

                    {showEmailOtp && (
                      <div className="mt-2 flex gap-2">
                        <Input
                          className="!h-[42px]"
                          placeholder="6 digit OTP"
                          maxLength={6}
                          value={emailOtp}
                          onChange={(e) =>
                            setEmailOtp(
                              e.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                        />

                        <Button
                          className="!h-[42px] !px-5"
                          onClick={() => {
                            if (
                              emailOtp.length !==
                              6
                            ) {
                              message.error(
                                "Enter valid OTP"
                              );
                              return;
                            }

                            verifyEmail.mutate(
                              {
                                email:
                                  getValues(
                                    "email"
                                  ),
                                otp: emailOtp,
                              },
                              {
                                onSuccess:
                                  () => {
                                    setEmailVerified(
                                      true
                                    );

                                    setShowEmailOtp(
                                      false
                                    );

                                    message.success(
                                      "Email verified"
                                    );
                                  },
                              }
                            );
                          }}
                        >
                          OK
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <ViewField
                    label="Email"
                    value={getValues(
                      "email"
                    )}
                  />
                )}
              </div>

              {/* MOBILE */}

              <div className="w-full">
                {isEdit ? (
                  <>
                    <div className="flex items-end gap-2">
                      <div className="w-full">
                        <RHFInput
                          name="mobile"
                          label="Mobile Number"
                        />
                      </div>

                      <Button
                        className="!h-[42px] !px-5"
                        disabled={
                          mobileVerified
                        }
                        onClick={async () => {

                          // ✅ VALIDATION FIX

                          const valid =
                            await trigger(
                              "mobile"
                            );

                          if (!valid) return;

                          sendMobileOtp.mutate(
                            {
                              mobile:
                                getValues(
                                  "mobile"
                                ),
                            }
                          );

                          setShowMobileOtp(
                            true
                          );
                        }}
                      >
                        Verify
                      </Button>

                      {mobileVerified && (
                        <CheckCircleFilled className="mb-3 text-lg text-green-500" />
                      )}
                    </div>

                    {showMobileOtp && (
                      <div className="mt-2 flex gap-2">
                        <Input
                          className="!h-[42px]"
                          placeholder="6 digit OTP"
                          maxLength={6}
                          value={mobileOtp}
                          onChange={(e) =>
                            setMobileOtp(
                              e.target.value.replace(
                                /\D/g,
                                ""
                              )
                            )
                          }
                        />

                        <Button
                          className="!h-[42px] !px-5"
                          onClick={() => {
                            if (
                              mobileOtp.length !==
                              6
                            ) {
                              message.error(
                                "Enter valid OTP"
                              );
                              return;
                            }

                            verifyMobile.mutate(
                              {
                                mobile:
                                  getValues(
                                    "mobile"
                                  ),
                                otp: mobileOtp,
                              },
                              {
                                onSuccess:
                                  () => {
                                    setMobileVerified(
                                      true
                                    );

                                    setShowMobileOtp(
                                      false
                                    );

                                    message.success(
                                      "Mobile verified"
                                    );
                                  },
                              }
                            );
                          }}
                        >
                          OK
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <ViewField
                    label="Mobile Number"
                    value={getValues(
                      "mobile"
                    )}
                  />
                )}
              </div>
            </div>

            {isEdit && (
              <div className="mt-8 flex gap-3">
                <Button
                  className="!h-[42px] !px-6"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>

                <Button
                  htmlType="submit"
                  type="primary"
                  className="!h-[42px] !border-none !px-6"
                  loading={
                    updateProfile.isPending
                  }
                  style={{
                    background:
                      "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
                  }}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
