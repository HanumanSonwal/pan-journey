"use client";

import {
  Avatar,
  Button,
  Dropdown,
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
    token: { colorText, colorTextSecondary },
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
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  return (
    <Header
      className={`
        h-[70px]
        px-3 md:px-5
        py-2
        flex items-center justify-between
        border-b
        ${
          isDark
            ? "bg-[#0F1C20] border-[rgba(255,255,255,0.06)] shadow-[0_2px_15px_rgba(0,0,0,0.25)]"
            : "bg-[#f8fcfd] border-[#d9edf5] shadow-[0_2px_15px_rgba(15,106,117,0.05)]"
        }
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          onClick={() => setCollapsed((prev) => !prev)}
          icon={
            collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
          }
          className="text-lg"
        />

        <span
          className="text-sm md:text-base font-semibold"
          style={{ color: colorText }}
        >
          Dashboard
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Theme Toggle */}
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {/* Notifications */}
        <div
          className={`
            w-10 h-10
            rounded-[5px]
            flex items-center justify-center
            ${
              isDark
                ? "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
                : "bg-white border border-[#d9edf5]"
            }
          `}
        >
          <BellOutlined />
        </div>

        {/* User Dropdown */}
        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
        >
          <Space className="cursor-pointer">
            <Avatar
              size={42}
              className="bg-[linear-gradient(135deg,#72C0F0,#0F6A75)]"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            {/* Desktop User Info */}
            <div className="hidden lg:block leading-tight">
              <div
                className="text-sm font-medium"
                style={{ color: colorText }}
              >
                {user?.name || "User"}
              </div>

              <div
                className="text-xs"
                style={{ color: colorTextSecondary }}
              >
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
