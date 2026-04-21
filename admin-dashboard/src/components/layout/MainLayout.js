"use client";

import { useTheme } from "@/context/ThemeContext";
import { ConfigProvider, Layout, theme } from "antd";
import { useMemo, useState } from "react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark } = useTheme();

  // 🔥 IMPORTANT: memoize theme (prevent re-render flicker)
  const antdTheme = useMemo(() => {
    return {
      algorithm: isDark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,
      token: {
        colorPrimary: "#e53935",
        borderRadius: 8,
      },
    };
  }, [isDark]);

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />

        <Layout>
          <HeaderBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          <Content
            style={{
              margin: "8px",
              padding: "20px",
              borderRadius: "12px",
              flex: 1,
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;