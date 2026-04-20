"use client";

import { ConfigProvider, Layout } from "antd";
import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 👇 Prevent SSR mismatch
  if (!mounted) return null;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />

        <Layout>
          <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />

          <Content style={{ margin: "16px", padding: 24 }}>{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
