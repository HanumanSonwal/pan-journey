"use client";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const SessionExpiredModal = ({
  open,
  loading,
  onReload,
}) => {
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      centered
      width={460}
    >
      <div className="py-2 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff7ed]">
          <ExclamationCircleOutlined className="text-[28px] text-[#f97316]" />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-[22px] font-semibold text-[#0f172a]">
          Session Expired
        </h2>

        {/* Description */}
        <p className="mt-3 leading-7 text-gray-500">
          Hotel room availability and pricing may have changed.
          <br />
          Please reload hotels to continue booking.
        </p>

        {/* Button */}
        <button
          disabled={loading}
          onClick={onReload}
          className="mt-6 h-[48px] rounded-xl px-6 text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background:
              "linear-gradient(180deg,#72C0F0 0%,#0F6A75 100%)",
          }}
        >
          {loading
            ? "Reloading Hotels..."
            : "Reload Hotels"}
        </button>
      </div>
    </Modal>
  );
};

export default SessionExpiredModal;