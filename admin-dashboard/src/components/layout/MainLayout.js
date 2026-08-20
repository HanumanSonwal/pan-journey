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
      algorithm: isDark
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm,

      ...(isDark ? darkTheme : lightTheme),
    };
  }, [isDark]);

  return (
    <ConfigProvider theme={antdTheme}>
      {mounted ? (
        <Layout className="min-h-screen">
          <Sidebar collapsed={collapsed} />

          <Layout
            className={`
              h-screen
              ${
                isDark
                  ? "bg-[#08161A]"
                  : "bg-[#edf7fa]"
              }
            `}
          >
            <HeaderBar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />

            <Content
              className={`
                m-4
                p-6
                rounded-[5px]
                flex-1
                overflow-y-auto
                h-[calc(100vh-64px)]
                ${
                  isDark
                    ? "bg-[#102027] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    : "bg-[#f8fcfd] shadow-[0_10px_30px_rgba(15,106,117,0.05)]"
                }
              `}
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
