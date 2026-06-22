"use client";

import { Avatar, Button, Dropdown, Layout, Space, Switch, theme } from "antd";

import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useTheme } from "@/context/ThemeContext";
import { logoutUser } from "@/modules/auth/api/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();
  const { user, clearUser } = useAuthStore();

  const {
    token: { colorBgContainer, colorText, colorTextSecondary },
  } = theme.useToken();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      clearUser();
      router.replace("/");
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") handleLogout();
    if (key === "profile") router.push("/profile");
    if (key === "settings") router.push("/settings");
  };

  const menuItems = [
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true },
  ];

  return (
    <Header
      className="px-3 md:px-5 py-2 flex items-center justify-between"
      style={{
        height: 70,
        paddingInline: 24,
        background: isDark ? "#0F1C20" : "#f8fcfd",

        borderBottom: isDark
          ? "1px solid rgba(255,255,255,.06)"
          : "1px solid #d9edf5",

        boxShadow: isDark
          ? "0 2px 15px rgba(0,0,0,.25)"
          : "0 2px 15px rgba(15,106,117,.05)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          onClick={() => setCollapsed((prev) => !prev)} // ✅ FIXED
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          className="text-lg"
        />

        <span
          className="font-semibold text-sm md:text-base"
          style={{ color: colorText }}
        >
          Dashboard
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6! md:gap-6">
        {/* Theme toggle */}

        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {/* Notifications */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "rgba(255,255,255,.05)" : "#fff",
            border: isDark
              ? "1px solid rgba(255,255,255,.08)"
              : "1px solid #d9edf5",
          }}
        >
          <BellOutlined />
        </div>

        {/* User Dropdown (Mobile + Desktop) */}
        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
        >
          <Space className="cursor-pointer">
            <Avatar
              style={{
                background: "linear-gradient(135deg,#72C0F0,#0F6A75)",
              }}
              size={42}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            {/* Desktop only text */}
            <div className="hidden lg:block leading-tight">
              <div className="text-sm font-medium" style={{ color: colorText }}>
                {user?.name || "User"}
              </div>

              <div className="text-xs" style={{ color: colorTextSecondary }}>
                {user?.role || "User"}
              </div>
            </div>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
