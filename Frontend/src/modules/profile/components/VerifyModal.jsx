"use client";

import { Modal, Input, Button } from "antd";
import { useState } from "react";

export default function VerifyModal({
  open,
  onClose,
  onVerify,
  label,
}) {
  const [otp, setOtp] = useState("");

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <h3 className="text-lg font-semibold mb-4">
        Verify {label}
      </h3>

      <Input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <Button
        type="primary"
        className="mt-4 w-full"
        onClick={() => onVerify(otp)}
      >
        Verify
      </Button>
    </Modal>
  );
}