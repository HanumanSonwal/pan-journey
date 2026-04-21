"use client";

import {
  Avatar,
  Button,
  Layout,
  Space,
  Switch,
  Dropdown,
  Input,
  theme,
} from "antd";

import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useTheme } from "@/context/ThemeContext";

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed }) => {
  const { isDark, toggleTheme } = useTheme();

  const {
    token: { colorBgContainer, colorText, colorTextSecondary },
  } = theme.useToken();

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
      {/* LEFT */}
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

      {/* CENTER */}
      <div className="header-search">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{
            width: 260,
            borderRadius: 8,
          }}
        />
      </div>

      {/* RIGHT */}
      <Space size="large">
        {/* THEME SWITCH */}
        <Switch
          checked={isDark}
          onChange={toggleTheme}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {/* NOTIFICATION */}
        <BellOutlined
          style={{
            fontSize: 18,
            color: colorText,
            cursor: "pointer",
          }}
        />

        {/* USER */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              style={{
                background: "linear-gradient(135deg, #e53935, #1677ff)",
              }}
              icon={<UserOutlined />}
            />

            {/* 🔥 USER INFO */}
            <div style={{ lineHeight: 1.2 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: colorText,
                }}
              >
                Aditya
              </div>

              <div
                style={{
                  fontSize: 12,
                  color: colorTextSecondary,
                }}
              >
                Admin
              </div>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderBar;