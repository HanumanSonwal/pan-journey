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
  useMemo,
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

import {
  useProfile,
  useSendEmailOtp,
  useSendMobileOtp,
  useUpdateProfile,
  useVerifyEmail,
  useVerifyMobile,
} from "../hooks/useProfile";

// ================= COUNTRY + STATE + CITY DATA =================

const countryStateCityData = {
  India: {
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Kota",
      "Ajmer",
      "Udaipur",
      "Bikaner",
    ],

    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Rajkot",
      "Vadodara",
    ],

    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
    ],
  },

  "United States": {
    California: [
      "Los Angeles",
      "San Francisco",
      "San Diego",
      "Sacramento",
    ],

    Texas: [
      "Houston",
      "Dallas",
      "Austin",
      "San Antonio",
    ],

    Florida: [
      "Miami",
      "Orlando",
      "Tampa",
      "Jacksonville",
    ],
  },

  Canada: {
    Ontario: [
      "Toronto",
      "Ottawa",
      "Hamilton",
    ],

    Alberta: [
      "Calgary",
      "Edmonton",
    ],
  },

  Australia: {
    Victoria: [
      "Melbourne",
    ],

    Queensland: [
      "Brisbane",
      "Gold Coast",
    ],
  },

  "United Kingdom": {
    England: [
      "London",
      "Manchester",
      "Liverpool",
    ],

    Scotland: [
      "Edinburgh",
      "Glasgow",
    ],
  },
};

// ================= GENDER OPTIONS =================

const genderOptions = [
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
];

// ================= SCHEMA =================

const schema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(
        1,
        "First name required"
      )
      .max(
        50,
        "Maximum 50 characters allowed"
      )
      .regex(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed"
      ),

    lastName: z
      .string()
      .trim()
      .max(
        50,
        "Maximum 50 characters allowed"
      )
      .regex(
        /^[A-Za-z\s]*$/,
        "Only alphabets are allowed"
      )
      .optional(),

    gender: z.enum(
      [
        "Male",
        "Female",
        "Other",
      ],
      {
        errorMap: () => ({
          message:
            "Please select valid gender",
        }),
      }
    ),

    email: z
      .string()
      .trim()
      .min(
        1,
        "Email is required"
      )
      .email(
        "Invalid email address"
      ),

    mobile: z
      .string()
      .trim()
      .min(
        1,
        "Mobile number is required"
      )
      .regex(
        /^[6-9]\d{9}$/,
        "Invalid mobile number"
      ),

    nationality: z
      .string()
      .min(
        1,
        "Nationality required"
      ),

    state: z
      .string()
      .min(
        1,
        "State required"
      ),

    city: z
      .string()
      .min(
        1,
        "City required"
      ),

    maritalStatus: z.enum(
      [
        "Single",
        "Married",
        "Divorced",
        "Widowed",
      ],
      {
        errorMap: () => ({
          message:
            "Please select marital status",
        }),
      }
    ),

    dateOfBirth: z
      .any()
      .nullable()
      .refine(
        (date) => {
          if (!date) return false;

          return dayjs(
            date
          ).isBefore(
            dayjs(),
            "day"
          );
        },
        {
          message:
            "Future date not allowed",
        }
      ),

    anniversary: z
      .any()
      .nullable()
      .optional(),
  })

  .refine(
    (data) => {
      if (
        !data.nationality ||
        !data.state ||
        !data.city
      ) {
        return true;
      }

      return (
        countryStateCityData[
          data.nationality
        ]?.[
          data.state
        ]?.includes(
          data.city
        ) || false
      );
    },
    {
      message:
        "Selected city does not belong to selected state",
      path: ["city"],
    }
  )

  .refine(
    (data) => {
      if (
        data.maritalStatus ===
        "Single"
      ) {
        return !data.anniversary;
      }

      return true;
    },
    {
      message:
        "Single person cannot add anniversary date",
      path: ["anniversary"],
    }
  )

  .refine(
    (data) => {
      if (
        !data.dateOfBirth ||
        !data.anniversary
      ) {
        return true;
      }

      return dayjs(
        data.anniversary
      ).isAfter(
        dayjs(data.dateOfBirth),
        "day"
      );
    },
    {
      message:
        "Anniversary cannot be before date of birth",
      path: ["anniversary"],
    }
  )

  .refine(
    (data) => {
      if (!data.anniversary)
        return true;

      return dayjs(
        data.anniversary
      ).isBefore(
        dayjs(),
        "day"
      );
    },
    {
      message:
        "Anniversary cannot be in future",
      path: ["anniversary"],
    }
  );

export default function ProfileOverview() {
  const { data: user } =
    useProfile();

  const updateProfile =
    useUpdateProfile();

  const sendEmailOtp =
    useSendEmailOtp();

  const verifyEmail =
    useVerifyEmail();

  const sendMobileOtp =
    useSendMobileOtp();

  const verifyMobile =
    useVerifyMobile();

  const [isEdit, setIsEdit] =
    useState(false);

  const [emailOtp, setEmailOtp] =
    useState("");

  const [
    mobileOtp,
    setMobileOtp,
  ] = useState("");

  const [
    showEmailOtp,
    setShowEmailOtp,
  ] = useState(false);

  const [
    showMobileOtp,
    setShowMobileOtp,
  ] = useState(false);

  const [
    emailVerified,
    setEmailVerified,
  ] = useState(false);

  const [
    mobileVerified,
    setMobileVerified,
  ] = useState(false);

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
      nationality: "",
      maritalStatus: "",
      dateOfBirth: null,
      anniversary: null,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    trigger,
    setValue,
  } = methods;

  // ================= WATCHERS =================

  const email = useWatch({
    control,
    name: "email",
  });

  const mobile = useWatch({
    control,
    name: "mobile",
  });

  const selectedCountry =
    useWatch({
      control,
      name: "nationality",
    });

  const selectedState =
    useWatch({
      control,
      name: "state",
    });

  const maritalStatus =
    useWatch({
      control,
      name: "maritalStatus",
    });

  // ================= FILTERED STATE OPTIONS =================

  const filteredStateOptions =
    useMemo(() => {
      if (
        !selectedCountry
      )
        return [];

      return Object.keys(
        countryStateCityData[
          selectedCountry
        ] || {}
      ).map((state) => ({
        label: state,
        value: state,
      }));
    }, [selectedCountry]);

  // ================= FILTERED CITY OPTIONS =================

  const filteredCityOptions =
    useMemo(() => {
      if (
        !selectedCountry ||
        !selectedState
      )
        return [];

      return (
        countryStateCityData[
          selectedCountry
        ]?.[
          selectedState
        ] || []
      ).map((city) => ({
        label: city,
        value: city,
      }));
    }, [
      selectedCountry,
      selectedState,
    ]);

  // ================= RESET STATE + CITY =================

  useEffect(() => {
    setValue(
      "state",
      ""
    );

    setValue(
      "city",
      ""
    );
  }, [
    selectedCountry,
    setValue,
  ]);

  useEffect(() => {
    setValue(
      "city",
      ""
    );
  }, [
    selectedState,
    setValue,
  ]);

  // ================= RESET ANNIVERSARY =================

  useEffect(() => {
    if (
      maritalStatus ===
      "Single"
    ) {
      setValue(
        "anniversary",
        null
      );
    }
  }, [
    maritalStatus,
    setValue,
  ]);

  // ================= RESET OTP =================

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

  // ================= SPLIT NAME =================

  const splitName = (
    fullName
  ) => {
    if (!fullName) {
      return {
        firstName: "",
        lastName: "",
      };
    }

    const parts =
      fullName
        .trim()
        .split(/\s+/);

    return {
      firstName:
        parts[0] || "",

      lastName: parts
        .slice(1)
        .join(" "),
    };
  };

  // ================= RESET DATA =================

  useEffect(() => {
    if (!user) return;

    const {
      firstName,
      lastName,
    } = splitName(user.name);

    reset({
      firstName,
      lastName,

      gender:
        user.gender || "",

      email:
        user.email || "",

      mobile:
        user.mobile || "",

      city:
        user.city || "",

      state:
        user.state || "",

      nationality:
        user.nationality ||
        "",

      maritalStatus:
        user.maritalStatus ||
        "",

      dateOfBirth:
        user.dateOfBirth
          ? dayjs(
              user.dateOfBirth
            )
          : null,

      anniversary:
        user.anniversary
          ? dayjs(
              user.anniversary
            )
          : null,
    });
  }, [user, reset]);

  // ================= PAYLOAD =================

  const buildPayload = (
    data,
    user
  ) => {
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
        data.nationality,

      maritalStatus:
        data.maritalStatus,

      dateOfBirth:
        data.dateOfBirth
          ? dayjs(
              data.dateOfBirth
            ).toISOString()
          : user?.dateOfBirth ||
            null,

      anniversary:
        data.anniversary
          ? dayjs(
              data.anniversary
            ).toISOString()
          : null,
    };
  };

  // ================= SUBMIT =================

  const onSubmit = (
    data
  ) => {
    const payload =
      buildPayload(
        data,
        user
      );

    updateProfile.mutate(
      payload,
      {
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
      }
    );
  };

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
      <div className="bg-white p-5">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#1f1f1f]">
            Personal Information
          </h2>

          {!isEdit && (
            <Button
              icon={
                <EditOutlined />
              }
              onClick={() =>
                setIsEdit(true)
              }
            >
              Edit Details
            </Button>
          )}
        </div>

        <FormProvider
          {...methods}
        >
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

              <div>
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

              <div>
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

              <div>
                {isEdit ? (
                  <RHFSelect
                    name="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    options={
                      genderOptions
                    }
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

              {/* DOB */}

              <div>
                {isEdit ? (
                  <RHFDatePicker
  name="dateOfBirth"
  label="Birth Date"
  placeholder="Select Birth Date"
  showToday={false}
  disabledDate={(current) =>
    current &&
    current >= dayjs().endOf("day")
  }
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

              <div>
                {isEdit ? (
                  <RHFSelect
                    name="nationality"
                    label="Nationality"
                    placeholder="Select Country"
                    options={Object.keys(
                      countryStateCityData
                    ).map(
                      (
                        country
                      ) => ({
                        label:
                          country,
                        value:
                          country,
                      })
                    )}
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

              <div>
                {isEdit ? (
                  <RHFSelect
                    name="state"
                    label="State"
                    placeholder={
                      selectedCountry
                        ? "Select State"
                        : "Select Country First"
                    }
                    disabled={
                      !selectedCountry
                    }
                    options={
                      filteredStateOptions
                    }
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

              <div>
                {isEdit ? (
                  <RHFSelect
                    name="city"
                    label="City"
                    placeholder={
                      selectedState
                        ? "Select City"
                        : "Select State First"
                    }
                    disabled={
                      !selectedState
                    }
                    options={
                      filteredCityOptions
                    }
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

              <div>
                {isEdit ? (
                  <RHFSelect
                    name="maritalStatus"
                    label="Marital Status"
                    placeholder="Select Status"
                    options={[
                      {
                        label:
                          "Single",
                        value:
                          "Single",
                      },

                      {
                        label:
                          "Married",
                        value:
                          "Married",
                      },

                      {
                        label:
                          "Divorced",
                        value:
                          "Divorced",
                      },

                      {
                        label:
                          "Widowed",
                        value:
                          "Widowed",
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

              <div>
                {isEdit ? (
                  <RHFDatePicker
                    name="anniversary"
                    label="Anniversary"
                    placeholder="Select Anniversary"
                    disabled={
                      maritalStatus ===
                      "Single"
                    }
                    showToday={false}
                    disabledDate={(current) =>
                      current &&
                      current >
                        dayjs().endOf(
                          "day"
                        )
                    }
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
            </div>

            <Divider className="!my-8" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* EMAIL */}

              <div>
                {isEdit ? (
                  <>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                      <div className="w-full">
                        <RHFInput
                          name="email"
                          label="Email"
                        />
                      </div>

                      <Button
                        className="!h-[42px] !min-w-[110px]"
                        disabled={
                          emailVerified
                        }
                        onClick={async () => {
                          const valid =
                            await trigger(
                              "email"
                            );

                          if (!valid)
                            return;

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
                        <CheckCircleFilled className="mb-[10px] text-[18px] text-green-500" />
                      )}
                    </div>

                    {showEmailOtp && (
                      <div className="mt-2 flex gap-2">
                        <Input
                          className="!h-[42px]"
                          placeholder="6 digit OTP"
                          maxLength={
                            6
                          }
                          value={
                            emailOtp
                          }
                          onChange={(
                            e
                          ) =>
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

              <div>
                {isEdit ? (
                  <>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                      <div className="w-full">
                        <RHFInput
                          name="mobile"
                          label="Mobile Number"
                        />
                      </div>

                      <Button
                        className="!h-[42px] !min-w-[110px]"
                        disabled={
                          mobileVerified
                        }
                        onClick={async () => {
                          const valid =
                            await trigger(
                              "mobile"
                            );

                          if (!valid)
                            return;

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
                        <CheckCircleFilled className="mb-[10px] text-[18px] text-green-500" />
                      )}
                    </div>

                    {showMobileOtp && (
                      <div className="mt-2 flex gap-2">
                        <Input
                          className="!h-[42px]"
                          placeholder="6 digit OTP"
                          maxLength={
                            6
                          }
                          value={
                            mobileOtp
                          }
                          onChange={(
                            e
                          ) =>
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
                  onClick={() =>
                    setIsEdit(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  htmlType="submit"
                  type="primary"
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
