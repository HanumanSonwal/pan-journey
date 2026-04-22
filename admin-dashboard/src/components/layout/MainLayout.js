"use client";

import { useTheme } from "@/context/ThemeContext";
import { ConfigProvider, Layout, theme } from "antd";
import { useEffect, useMemo, useState } from "react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const antdTheme = useMemo(() => {
    return {
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: "#e53935",
        borderRadius: 8,
      },
    };
  }, [isDark]);

  return (
    <ConfigProvider theme={antdTheme}>
      {mounted ? (
        <Layout style={{ minHeight: "100vh", overflow: "hidden"  }}>
          <Sidebar collapsed={collapsed} />

          <Layout style={{ height: "100vh" }}>
            <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />

            <Content
              style={{
                margin: "8px",
                padding: "20px",
                borderRadius: "12px",
                flex: 1,
                overflowY: "auto",
                height: "calc(100vh - 64px)",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      ) : null}
    </ConfigProvider>
  );
};

export default MainLayout;
