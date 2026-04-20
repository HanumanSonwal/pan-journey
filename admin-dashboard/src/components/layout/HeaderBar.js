"use client";

import { Layout, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const HeaderBar = ({ collapsed, setCollapsed }) => {
  return (
    <Header style={{ padding: 0 }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: 18,
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default HeaderBar;