"use client";

import { Button, Card, Checkbox, Form, Input, theme, Typography } from "antd";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import { useApiMutation } from "@/hooks/useApiMutation";
import { loginUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const { Title, Text } = Typography;

const LoginPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const { mutate, isPending } = useApiMutation(loginUser, {
    onSuccess: (res) => {
      if (res.success) {
        console.log("📦 loginUser:", res);
        const userData = res.data?.user;
        setUser(userData);
        router.replace("/dashboard");
      }
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-left-content">
          <h1>Pan Admin</h1>
          <p>Manage bookings, users and analytics in one place.</p>

          <ul>
            <li>✔ Booking Management</li>
            <li>✔ Analytics Dashboard</li>
            <li>✔ Role-based Access</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <Card
          variant="borderless"
          style={{
            width: "100%",
            maxWidth: 380,
            borderRadius: 14,
            background: colorBgContainer,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
          styles={{
            body: { padding: 20 },
          }}
        >
          <Title level={3} style={{ marginBottom: 0 }}>
            Sign in
          </Title>

          <Text type="secondary">Access your dashboard</Text>

          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                size="large"
              />
            </Form.Item>

            <div className="login-options">
              <Checkbox>Remember</Checkbox>
              <a>Forgot?</a>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isPending}
              style={{
                background: "#e53935",
                borderColor: "#e53935",
                height: 42,
              }}
            >
              Login
            </Button>

            <Text className="login-footer">Admin • Staff Access</Text>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
