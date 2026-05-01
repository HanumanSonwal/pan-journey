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

import { useSendEmailotp } from "@/modules/auth/hooks/useLogin";

const schema = z.object({
  email: z.string().email("Enter valid email"),
  otp: z.string().optional(),
});

export default function EmailOtpLogin({ onSuccess }) {
  const [step, setStep] = useState("email");
  const [timer, setTimer] = useState(0);
  const [verifying, setVerifying] = useState(false);

  const sendOtpMutation = useSendEmailotp();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const email = watch("email");
  const otp = watch("otp");

  // 🔥 SUBMIT
  const onSubmit = async (data) => {
    try {
      // STEP 1: SEND OTP
      if (step === "email") {
        await sendOtpMutation.mutateAsync({
          email: data.email,
        });

        message.success("OTP sent to email");
        setStep("otp");
        setTimer(30);
        return;
      }

      // STEP 2: VERIFY OTP
      if (!data.otp || data.otp.length !== 6) {
        message.error("Enter valid 6 digit OTP");
        return;
      }

      setVerifying(true);

      // ✅ NextAuth login (session create)
      const res = await signIn("credentials", {
        email: data.email,
        otp: data.otp,
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
      console.error("❌ EMAIL LOGIN ERROR:", err);
      message.error(err?.message || "Something went wrong");
      setVerifying(false);
    }
  };

  // ⏳ TIMER
  useEffect(() => {
    if (!timer) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  // 🔁 RESEND
  const handleResend = async () => {
    try {
      await sendOtpMutation.mutateAsync({ email });
      message.success("OTP resent");
      setTimer(30);
    } catch {
      message.error("Failed to resend OTP");
    }
  };

  const isLoading = sendOtpMutation.isPending || verifying;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* EMAIL */}
      {step === "email" && (
        <AppInput
          label="Enter Email Address"
          value={email}
          {...register("email")}
          onChange={(e) =>
            setValue("email", e.target.value, { shouldValidate: true })
          }
          error={errors.email?.message}
        />
      )}

      {/* OTP */}
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

      {/* BUTTON */}
      <AppButton htmlType="submit" loading={isLoading}>
        {step === "email" ? "Continue" : "Verify OTP"}
      </AppButton>
    </form>
  );
}
