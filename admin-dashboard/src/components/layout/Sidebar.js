"use client";

import { menuItems } from "@/config/menuConfig";
import { useTheme } from "@/context/ThemeContext";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Image from "next/image";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const Sidebar = ({ collapsed, role = "admin" }) => {
  const pathname = usePathname();
  const { isDark } = useTheme();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const filteredItems = menuItems.filter((item) => item.roles.includes(role));

  const bottomItems = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        { key: "profile", label: "Profile Settings" },
        { key: "account", label: "Account Settings" },
      ],
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={260}
        collapsedWidth={80}
        breakpoint="lg"
        style={{
          background: colorBgContainer,
          height: "100vh", // 🔥 IMPORTANT
        }}
      >
        {/* 🔥 FULL FLEX WRAPPER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "16px 12px",
          }}
        >
          {/* 🔝 TOP */}
          <div>
            {/* LOGO */}
            <div
              style={{
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: collapsed ? 40 : 130,
                  height: 50,
                  position: "relative",
                }}
              >
                <Image
                  src="/images/mmt_logo.avif"
                  alt="logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* MAIN MENU */}
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              items={filteredItems}
              theme={isDark ? "dark" : "light"}
              inlineCollapsed={collapsed}
              style={{
                borderRight: 0,
                background: "transparent",
              }}
            />
          </div>

          {/* 🔥 PUSH TO BOTTOM */}
          <div style={{ marginTop: "auto" }}>
            <Menu
              mode="inline"
              items={bottomItems}
              theme={isDark ? "dark" : "light"}
              selectable={false}
              inlineCollapsed={collapsed}
              style={{
                borderRight: 0,
                background: "transparent",
                marginTop: 12,
              }}
            />
          </div>
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
