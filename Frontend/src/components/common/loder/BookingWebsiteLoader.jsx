"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function BookingWebsiteLoader() {
  return (
    <div
      className="
        fixed inset-0
        z-[999999]
        flex flex-col items-center justify-center
        bg-white
        backdrop-blur-sm
        animate-fadeIn
      "
    >
      <Spin
        size="large"
        indicator={
          <LoadingOutlined
            spin
            style={{
              fontSize: 46,
              color: "#0077b6",
            }}
          />
        }
      />


    </div>
  );
}
