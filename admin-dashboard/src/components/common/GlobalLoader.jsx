"use client";

import { Spin } from "antd";

export default function GlobalLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #0B5FFF10, #FF3B3010)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />

        <p
          style={{
            marginTop: 16,
            fontWeight: 500,
            color: "#0B5FFF",
          }}
        >
          Checking authentication...
        </p>
      </div>
    </div>
  );
}