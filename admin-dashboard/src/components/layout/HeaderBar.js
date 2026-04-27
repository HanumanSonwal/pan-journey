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
import { logoutUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
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
    } catch (e) {
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
      style={{
        padding: "0 20px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: isDark
          ? "0 2px 6px rgba(0,0,0,0.5)"
          : "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <Space size="middle">
        <Button
          type="text"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          style={{ fontSize: 18 }}
        />

        <span
          style={{
            fontWeight: 600,
            fontSize: 16,
            color: colorText,
          }}
        >
          Dashboard
        </span>
      </Space>

      <div>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{
            width: 260,
            borderRadius: 8,
          }}
        />
      </div>

      <Space size="large">
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        <BellOutlined
          style={{
            fontSize: 18,
            color: colorText,
            cursor: "pointer",
          }}
        />

        <Dropdown
          menu={{
            items: menuItems,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              style={{
                background: "linear-gradient(135deg, #FF3B30, #0B5FFF)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>

            <div style={{ lineHeight: 1.2 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: colorText,
                }}
              >
                {user?.name || "User"}
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: colorTextSecondary,
                }}
              >
                {user?.role || "User"}
              </div>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderBar;
