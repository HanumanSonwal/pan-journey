"use client";

import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import { CloseOutlined } from "@ant-design/icons";

import { Modal } from "antd";
import Image from "next/image";

export default function LoginModal({ isOpen, onClose }) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={1000}
      closable
      closeIcon={
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-gray-700">
          <CloseOutlined className="text-[14px]" />
        </span>
      }
    >
      <div className="flex h-130 rounded-xl overflow-hidden">
        {/* LEFT IMAGE */}
        <div className="w-1/2 h-full relative">
          <Image
            src="/images/auth/login.png"
            alt="travel"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}

        <div className="w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h2 className="font-roboto font-semibold text-[36px] leading-[100%] capitalize mb-2">
              Login/Sign Up
            </h2>

            <p className="font-roboto font-medium text-[14px] leading-[120%] text-gray-500 ">
              Login or create an account to continue booking your perfect stay.
            </p>

            {/* Input */}
            <div className="mb-6 mt-10">
              <AppInput placeholder="Enter your Mobile No." />
            </div>

            {/* Button */}
            <div className="mb-4">
              <AppButton>Continue</AppButton>
            </div>

            {/* Divider */}
            <p className="text-center text-[14px] text-gray-500 my-4">
              Or Login/Sign Up with
            </p>

            {/* Social */}
            <div className="flex justify-center gap-4">
              <button className="w-[48px] h-[48px] border rounded-lg flex items-center justify-center hover:bg-gray-100">
                G
              </button>
              <button className="w-[48px] h-[48px] border rounded-lg flex items-center justify-center hover:bg-gray-100">
                ✉️
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By continuing, you agree to our{" "}
            <span className="text-[#4A9BB5]">Terms & Conditions</span> and{" "}
            <span className="text-[#4A9BB5]">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </Modal>
  );
}
