"use client";

import { Form, message } from "antd";
import { useEffect, useState } from "react";

import AppButton from "@/components/ui/AppButton";
import FloatingAntInput from "@/components/ui/FloatingInput";
import OtpInput from "@/modules/auth/components/OtpInput";

import { useSendOtp, useVerifyOtp } from "@/modules/auth/hooks/useLogin";

export default function MobileOtpLogin({ onSuccess }) {
  const [step, setStep] = useState("mobile");
  const [timer, setTimer] = useState(0);
  const [form] = Form.useForm();

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();

  // ✅ Only numbers allow + live validation trigger
  const handleMobileChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 10);
    form.setFieldsValue({ mobile: value });

    // ✅ real-time validation hatao jab correct ho
    form.validateFields(["mobile"]).catch(() => {});
  };

  const handleSendOtp = async (values) => {
    try {
      await sendOtpMutation.mutateAsync({
        mobile: `91${values.mobile}`,
      });

      message.success("OTP sent successfully");
      setStep("otp");
      setTimer(30);
    } catch {
      message.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const values = await form.validateFields(["otp"]);

      const mobile = form.getFieldValue("mobile");

      await verifyOtpMutation.mutateAsync({
        mobile: `91${mobile}`,
        otp: values.otp,
      });

      message.success("Login successful");
      onSuccess?.();
    } catch {
      message.error("Enter valid OTP");
    }
  };

  // ⏱ Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((p) => p - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSendOtp}
      validateTrigger="onBlur" // ✅ only blur pe validation trigger
    >
      {/* MOBILE */}
      {step === "mobile" && (
        <Form.Item
          name="mobile"
          validateTrigger={["onBlur", "onSubmit"]} // ✅ focus ke baad hi error
          rules={[
            { required: true, message: "Mobile number required" },
            {
              len: 10,
              message: "Enter valid 10 digit mobile number",
            },
          ]}
        >
          <FloatingAntInput
            label="Enter Mobile Number"
            autoFocus
            maxLength={10}
            onChange={handleMobileChange}
          />
        </Form.Item>
      )}

      {/* OTP */}
      {step === "otp" && (
        <>
          <Form.Item
            name="otp"
            validateTrigger={["onBlur", "onSubmit"]}
            rules={[
              { required: true, message: "OTP required" },
              { len: 6, message: "Enter 6 digit OTP" },
            ]}
          >
            <OtpInput
              onChange={(val) => {
                form.setFieldValue("otp", val);

                // ✅ live error remove
                form.validateFields(["otp"]).catch(() => {});
              }}
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
      {step === "mobile" ? (
        <AppButton
          htmlType="submit"
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
