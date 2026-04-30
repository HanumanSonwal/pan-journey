"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import OtpInput from "@/modules/auth/components/OtpInput";

import { useSendOtp, useVerifyOtp } from "@/modules/auth/hooks/useLogin";

const schema = z.object({
  mobile: z.string().length(10, "Enter valid 10 digit mobile"),
  otp: z.string().optional(),
});

export default function MobileOtpLogin({ onSuccess }) {
  const [step, setStep] = useState("mobile");
  const [timer, setTimer] = useState(0);

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      mobile: "",
      otp: "",
    },
  });

  const mobile = watch("mobile");
  const otp = watch("otp");

  const onSubmit = async (data) => {
    console.log("DATA:", data);
    console.log("MOBILE:", data.mobile);
    console.log("TYPE:", typeof data.mobile);
    try {
      if (step === "mobile") {
        await sendOtpMutation.mutateAsync({
          mobile: data.mobile,
        });

        message.success("OTP sent");
        setStep("otp");
        setTimer(30);
      } else {
        await verifyOtpMutation.mutateAsync({
          mobile: data.mobile,
          otp: data.otp,
        });

        message.success("Login success");
        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!timer) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {step === "mobile" && (
        <AppInput
          label="Enter Mobile Number"
          value={mobile}
          {...register("mobile")}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
            setValue("mobile", val, { shouldValidate: true });
          }}
          error={errors.mobile?.message}
        />
      )}

      {step === "otp" && (
        <>
          <OtpInput
            value={otp}
            onChange={(val) => setValue("otp", val, { shouldValidate: true })}
          />

          {errors.otp && (
            <p className="text-red-500 text-sm text-center">
              {errors.otp.message}
            </p>
          )}

          <div className="text-center">
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={handleSubmit(onSubmit)}
              >
                Resend OTP
              </span>
            )}
          </div>
        </>
      )}

      <AppButton htmlType="submit" loading={sendOtpMutation.isPending}>
        {step === "mobile" ? "Continue" : "Verify OTP"}
      </AppButton>
    </form>
  );
}
