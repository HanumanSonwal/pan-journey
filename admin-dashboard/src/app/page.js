"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Typography } from "antd";

const { Title } = Typography;

export default function LoginPage() {
  const onFinish = (values) => {
    console.log("Login Data:", values);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #1677ff, #69b1ff)",
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <a href="#">Forgot Password?</a>
        </div>
      </Card>
    </div>
  );
}
