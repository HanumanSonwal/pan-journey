"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function BookingWebsiteLoader() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 40,
              color: "#0077b6",
            }}
            spin
          />
        }
      />
    </div>
  );
}
