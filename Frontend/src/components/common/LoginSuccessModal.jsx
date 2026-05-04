"use client";

import { Button, Modal } from "antd";
import Image from "next/image";

export default function LoginSuccessModal({ open, onClose, onProfile }) {
  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      width={720} // thoda compact better lagta hai
      centered
      mask={{ closable: false }}
      styles={{
        body: {
          padding: "40px 32px", 
        },
      }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <Image
          src="/images/loginSuccsess-icon.svg"
          alt="success"
          width={200}
          height={200}
          className="mb-4"
        />

        {/* Title */}
        <h2 className="font-roboto font-bold text-[32px] leading-tight text-center mb-3">
          Logged In Successfully
        </h2>

        {/* Description */}
        <p className="font-roboto font-medium text-[18px] leading-[150%] text-gray-500 max-w-[520px]">
          Your account is ready to go. Complete your profile for a faster and
          more personalized booking experience.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8 w-full">
          {/* Primary */}
          <Button
            size="large"
            onClick={onProfile}
            className="h-[44px] px-6 rounded-lg text-white! font-medium px-10!"
            style={{
              background:
                "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
              border: "none",
            }}
          >
            Set Up Profile
          </Button>

          {/* Secondary */}
          <Button
            size="large"
            onClick={onClose}
            className="h-[44px] px-6 rounded-lg font-medium text-[#0F6A75] border border-[#0F6A75] hover:bg-[#0F6A75]/5"
          >
            Continue Browsing
          </Button>
        </div>
      </div>
    </Modal>
  );
}