"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function BookingWebsiteLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 40,
              color: "#0077b6", // loader color
            }}
            spin
          />
        }
      />
    </div>
  );
}
