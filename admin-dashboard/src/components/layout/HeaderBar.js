"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  Space,
  Switch,
  theme,
} from "antd";

import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
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
        background: colorBgContainer,
        boxShadow: isDark
          ? "0 2px 6px rgba(0,0,0,0.5)"
          : "0 2px 6px rgba(0,0,0,0.05)",
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

      {/* SEARCH (desktop only) */}
      <div className="hidden md:block">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="w-64 rounded-lg"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Theme toggle */}
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {/* Notifications */}
        <BellOutlined className="text-lg cursor-pointer" />

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
                background: "linear-gradient(135deg, #FF3B30, #0B5FFF)",
              }}
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
