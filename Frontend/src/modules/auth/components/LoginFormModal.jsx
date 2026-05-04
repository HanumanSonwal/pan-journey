"use client";

import { CloseOutlined, MailOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

import EmailOtpLogin from "./EmailOtpLogin";
import MobileOtpLogin from "./MobileOtpLogin";
import { signIn } from "next-auth/react";

export default function LoginModal({ isOpen, onClose,onSuccess  }) {
  const [activeView, setActiveView] = useState("mobile");
  const [resetKey, setResetKey] = useState(0);

  const handleClose = () => {
    setActiveView("mobile");
    setResetKey((prev) => prev + 1); 
    onClose();
  };

    const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
     onSuccess();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      centered
      width={1000}
      closable
      closeIcon={
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white hover:bg-gray-700">
          <CloseOutlined className="text-[14px]" />
        </span>
      }
    >
      <div className="flex h-150 rounded-xl overflow-hidden">
        {/* Left Image */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/images/auth/login.png"
            alt="travel"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-1/2 px-10 py-8 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <h2 className="font-roboto font-semibold text-[32px] leading-tight">
                Login / Sign Up
              </h2>

              <p className="font-roboto font-medium text-[14px] text-gray-500 leading-relaxed">
                Login or create an account to continue booking your perfect
                stay.
              </p>
            </div>

            {/* Forms */}
            <div key={resetKey} className="flex flex-col gap-4">
              {activeView === "mobile" && (
              <MobileOtpLogin onSuccess={onSuccess} />
              )}

              {activeView === "email" && (
                <div className="flex flex-col gap-4">
                  {/* Back */}
                  <button
                    onClick={() => setActiveView("mobile")}
                    // className="text-sm text-gray-500  hover:text-black text-left "
                    className="font-roboto font-medium text-[14px] text-gray-500 leading-relaxed text-left"
                  >
                    ← Back to Mobile Login
                  </button>

                 <EmailOtpLogin onSuccess={onSuccess} />
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="flex flex-col gap-4">
              <p className="text-center text-[14px] text-gray-400">
                Or Login/Sign Up with
              </p>

              {/* Social Buttons */}
              <div className="flex justify-center gap-4">
                {/* Google */}
                <button onClick={handleGoogleLogin}  className="w-[48px] h-[48px] border rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                  <Image
                    src="/images/google.png"
                    alt="google"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Email */}
                <button
                  onClick={() => setActiveView("email")}
                  className="w-[48px] h-[48px] border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <MailOutlined className="text-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center">
            By continuing, you agree to Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </Modal>
  );
}
