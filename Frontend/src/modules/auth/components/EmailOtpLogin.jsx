"use client";

import { useEffect, useState } from "react";
import { Form, message } from "antd";

import AppButton from "@/components/ui/AppButton";
import FloatingAntInput from "@/components/ui/FloatingInput";
import OtpInput from "@/modules/auth/components/OtpInput";

import { useSendOtp, useVerifyOtp } from "@/modules/auth/hooks/useLogin";

export default function EmailOtpLogin({ onSuccess }) {
  const [step, setStep] = useState("email");
  const [timer, setTimer] = useState(0);
  const [form] = Form.useForm();

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  // 📧 Send OTP
  const handleSendOtp = async (values) => {
    try {
      await sendOtpMutation.mutateAsync({
        email: values.email,
        type: "email", // backend differentiate
      });

      message.success("OTP sent to email");
      setStep("otp");
      setTimer(30);
    } catch {
      message.error("Failed to send OTP");
    }
  };

  // 🔐 Verify OTP
  const handleVerifyOtp = async () => {
    const otp = form.getFieldValue("otp");
    const email = form.getFieldValue("email");

    if (!otp || otp.length !== 6) {
      return message.error("Enter valid OTP");
    }

    try {
      await verifyOtpMutation.mutateAsync({
        email,
        otp,
        type: "email",
      });

      message.success("Login successful");
      onSuccess?.();
    } catch {
      message.error("Invalid OTP");
    }
  };

  // ⏳ Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((p) => p - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Form form={form} layout="vertical" onFinish={handleSendOtp}>
      {/* EMAIL INPUT */}
      {step === "email" && (
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter valid email" },
          ]}
        >
          <FloatingAntInput
            label="Enter Email Address"
            autoFocus
          />
        </Form.Item>
      )}

      {/* OTP */}
      {step === "otp" && (
        <>
          <Form.Item name="otp">
            <OtpInput
              onChange={(val) => form.setFieldValue("otp", val)}
            />
          </Form.Item>

          <div className="text-center mb-4">
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => form.submit()}
              >
                Resend OTP
              </span>
            )}
          </div>
        </>
      )}

      {/* BUTTON */}
      {step === "email" ? (
        <AppButton
          htmlType="submit"
          onClick={() => form.submit()}
          loading={sendOtpMutation.isPending}
        >
          Continue
        </AppButton>
      ) : (
        <AppButton
          onClick={handleVerifyOtp}
          loading={verifyOtpMutation.isPending}
        >
          Verify OTP
        </AppButton>
      )}
    </Form>
  );
}