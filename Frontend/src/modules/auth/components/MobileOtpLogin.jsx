"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import OtpInput from "@/modules/auth/components/OtpInput";
import { useSendOtp } from "@/modules/auth/hooks/useLogin";

const schema = z.object({
  mobile: z.string().length(10, "Enter valid 10 digit mobile"),
  otp: z.string().optional(),
});

export default function MobileOtpLogin({ onSuccess }) {
  const [step, setStep] = useState("mobile");
  const [timer, setTimer] = useState(0);
  const [verifying, setVerifying] = useState(false);

  const sendOtpMutation = useSendOtp();

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

  // 🔥 SUBMIT
  const onSubmit = async (data) => {
    try {
      // 🔹 STEP 1: SEND OTP
      if (step === "mobile") {
        await sendOtpMutation.mutateAsync({
          mobile: data.mobile,
        });

        message.success("OTP sent");
        setStep("otp");
        setTimer(30);
        return;
      }

      // 🔹 STEP 2: VERIFY OTP
      if (!data.otp || data.otp.length !== 6) {
        message.error("Enter valid 6 digit OTP");
        return;
      }

      setVerifying(true);

      const res = await signIn("credentials", {
        mobile: String(data.mobile),
        otp: String(data.otp),
        redirect: false,
      });

      setVerifying(false);

      if (!res) {
        message.error("No response from server");
        return;
      }

      if (res.error) {
        message.error(res.error);
        return;
      }

      if (res.ok) {
        message.success("Login success");
        onSuccess?.();
      }
    } catch (err) {
      console.error("❌ LOGIN ERROR:", err);
      message.error("Something went wrong");
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (!timer) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleResend = async () => {
    try {
      await sendOtpMutation.mutateAsync({ mobile });
      message.success("OTP resent");
      setTimer(30);
    } catch {
      message.error("Failed to resend OTP");
    }
  };

  const isLoading = sendOtpMutation.isPending || verifying;

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
              <span className="text-gray-500">Resend in {timer}s</span>
            ) : (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={handleResend}
              >
                Resend OTP
              </span>
            )}
          </div>
        </>
      )}

      <AppButton htmlType="submit" loading={isLoading}>
        {step === "mobile" ? "Continue" : "Verify OTP"}
      </AppButton>
    </form>
  );
}
