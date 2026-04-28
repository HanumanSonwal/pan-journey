"use client";

import { useTheme } from "@/context/ThemeContext";
import { useFilteredMenu } from "@/modules/shared/hooks/useFilteredMenu";
import { logoutUser } from "@/modules/auth/api/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Layout, Menu, theme } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isDark } = useTheme();

  const { user, clearUser, permissions, isLoading } = useAuthStore();

  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  console.log("PERMISSIONS:", permissions);
  console.log("LOADING:", isLoading);
  const {
    token: { colorBgContainer, colorTextSecondary },
  } = theme.useToken();

  const filteredItems = useFilteredMenu();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    clearUser();
    router.replace("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") handleLogout();
    if (key === "profile") router.push("/profile");
    if (key === "account") router.push("/account");
  };

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
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={260}
      collapsedWidth={80}
      breakpoint="lg"
      style={{
        background: colorBgContainer,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "16px 12px",
        }}
      >
        {/* 🔹 LOGO */}
        <div>
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

          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={["/dashboard/staff"]}
            items={filteredItems}
            theme={isDark ? "dark" : "light"}
            inlineCollapsed={collapsed}
            style={{
              borderRight: 0,
              background: "transparent",
            }}
          />
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 8px",
              marginBottom: 8,
            }}
          >
            <Avatar
              style={{
                background: "linear-gradient(135deg, #FF3B30, #0B5FFF)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            {!collapsed && (
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  {user?.name || "User"}
                </div>
                <div style={{ fontSize: 12, color: colorTextSecondary }}>
                  {user?.role || "User"}
                </div>
              </div>
            )}
          </div>

          <Menu
            mode="inline"
            items={bottomItems}
            onClick={handleMenuClick}
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
  );
};

export default Sidebar;
