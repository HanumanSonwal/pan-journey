"use client";

import { useState } from "react";
import { Input, Button, Form, Card, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendOtp } from "../api/sendOtp";
import { verifyOtp } from "../api/verifyOtp";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/axios";

// ✅ Step 1 Schema (Phone)
const phoneSchema = z.object({
  phone: z.string().min(10, "Enter valid phone number"),
});

// ✅ Step 2 Schema (OTP)
const otpSchema = z.object({
  otp: z.string().length(6, "Enter 6 digit OTP"),
});

export default function OtpLoginForm() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const setUser = useAuthStore((s) => s.setUser);

  // Step 1 form
  const phoneForm = useForm({
    resolver: zodResolver(phoneSchema),
  });

  // Step 2 form
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
  });

  // 🔹 Send OTP
  const handleSendOtp = async (data) => {
    try {
      await sendOtp(data.phone);
      setPhone(data.phone);
      setStep(2);
      message.success("OTP sent");
    } catch (err) {
      message.error("Failed to send OTP");
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async (data) => {
    try {
      await verifyOtp({
        phone,
        otp: data.otp,
      });

      // 🔥 user fetch (important)
      const res = await api.get("/auth/me");

      setUser(res.data.user);

      message.success("Login success");

      window.location.href = "/"; // redirect

    } catch (err) {
      message.error("Invalid OTP");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card title="Login / Signup" className="w-96">

        {/* STEP 1 */}
        {step === 1 && (
          <Form layout="vertical" onFinish={phoneForm.handleSubmit(handleSendOtp)}>
            <Form.Item
              label="Mobile Number"
              validateStatus={phoneForm.formState.errors.phone ? "error" : ""}
              help={phoneForm.formState.errors.phone?.message}
            >
              <Controller
                name="phone"
                control={phoneForm.control}
                render={({ field }) => <Input {...field} placeholder="Enter mobile number" />}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Send OTP
            </Button>
          </Form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Form layout="vertical" onFinish={otpForm.handleSubmit(handleVerifyOtp)}>
            <Form.Item
              label="Enter OTP"
              validateStatus={otpForm.formState.errors.otp ? "error" : ""}
              help={otpForm.formState.errors.otp?.message}
            >
              <Controller
                name="otp"
                control={otpForm.control}
                render={({ field }) => <Input {...field} maxLength={6} />}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Verify OTP
            </Button>

            <Button type="link" onClick={() => setStep(1)}>
              Change Number
            </Button>
          </Form>
        )}

      </Card>
    </div>
  );
}