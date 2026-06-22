"use client";

import { useTheme } from "@/context/ThemeContext";
import { darkTheme, lightTheme } from "@/theme/themeConfig";
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

      ...(isDark ? darkTheme : lightTheme),
    };
  }, [isDark]);

  return (
    <ConfigProvider theme={antdTheme}>
      {mounted ? (
        <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
          <Sidebar collapsed={collapsed} />
          <Layout
            style={{
              height: "100vh",
              background: isDark ? "#08161A" : "#edf7fa",
            }}
          >
            <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />

            <Content
              style={{
                margin: "16px",
                padding: "24px",
                borderRadius: "20px",
                background: isDark ? "#102027" : "#f8fcfd",
                boxShadow: isDark
                  ? "0 10px 30px rgba(0,0,0,.25)"
                  : "0 10px 30px rgba(15,106,117,.05)",
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
