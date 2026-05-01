"use client";

import { api } from "@/services/axios";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [testResponse, setTestResponse] = useState(null);

  const handleSendOtp = async () => {
    if (!mobile) return alert("Enter mobile");

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/api/v1/customer/auth/otp/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStep(2);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    setLoading(true);

    const res = await signIn("credentials", {
      mobile,
      otp,
      redirect: false,
    });

    setLoading(false);

    if (res.ok) {
      alert("Login success ✅");
    } else {
      alert(res.error);
    }
  };

  const handleTestApi = async () => {
    try {
      console.log("🚀 Calling protected API");

      const res = await api.get("/test");

      console.log("✅ RESPONSE:", res.data);

      setTestResponse(res.data);
    } catch (err) {
      console.log("❌ FULL ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);
      }

    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login / Signup</h2>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Mobile"
              className="w-full border p-3 rounded-lg mb-4"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            />

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-blue-600 text-white p-3 rounded-lg"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border p-3 rounded-lg mb-4"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white p-3 rounded-lg"
            >
              Verify
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleTestApi}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Test API 🚀
      </button>

      {testResponse && (
        <pre className="bg-white p-4 w-[400px]">
          {JSON.stringify(testResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}
