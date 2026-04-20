"use client";

import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const pathname = usePathname();

  const items = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "/dashboard/users",
      icon: <UserOutlined />,
      label: <Link href="/dashboard/users">Users</Link>,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={200}
      collapsedWidth={80}
      style={{ transition: "all 0.2s" }}
    >
      <div style={{ color: "white", padding: 16, textAlign: "center" }}>
        {collapsed ? "LOGO" : "My Admin"}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
