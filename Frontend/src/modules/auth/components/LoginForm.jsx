"use client";

import { Button, Card, Divider, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSendOtp, useVerifyOtp } from "../hooks/useLogin";
import OtpInput from "./OtpInput";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  const handleSendOtp = async () => {
    try {
      if (!mobile) {
        return message.error("Enter mobile number");
      }

      await sendOtpMutation.mutateAsync(mobile);

      message.success("OTP sent successfully");
      setStep(2);
    } catch (err) {
      console.log("SEND OTP ERROR:", err);
      message.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp || otp.length !== 6) {
        return message.error("Enter valid OTP");
      }

      setLoading(true);

      const res = await signIn("credentials", {
        mobile,
        otp,
        redirect: false,
      });

      setLoading(false);

      if (res?.ok) {
        message.success("Login successful");
        window.location.href = "/";
      } else {
        message.error(res?.error || "Invalid OTP");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg rounded-xl">
        <Button block type="primary" onClick={() => signIn("google")}>
          Continue with Google
        </Button>

        <Divider>OR</Divider>

        {step === 1 && (
          <>
            <Input
              placeholder="Enter mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="mb-3"
            />

            <Button
              type="primary"
              block
              onClick={handleSendOtp}
              loading={sendOtpMutation.isPending}
            >
              Send OTP
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <OtpInput onChange={setOtp} />

            <Button
              type="primary"
              block
              className="mt-3"
              onClick={handleVerifyOtp}
              loading={verifyOtpMutation.isPending}
            >
              Verify OTP
            </Button>

            <Button type="link" onClick={() => setStep(1)}>
              Change Number
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}
