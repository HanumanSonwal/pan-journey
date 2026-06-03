"use client";

import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";

const { Title, Text } = Typography;

export default function GuestDetailsForm({ onSubmit }) {
  const [form] = Form.useForm();

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <Title level={4} className="!mb-6">
        Guest Details
      </Title>

      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={[18, 18]}>
          {/* TITLE */}
          <Col xs={24} md={4}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Select title",
                },
              ]}
            >
              <Select placeholder="Select" size="large">
                <Select.Option value="Mr">Mr</Select.Option>

                <Select.Option value="Mrs">Mrs</Select.Option>

                <Select.Option value="Miss">Miss</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {/* FIRST */}
          <Col xs={24} md={10}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Enter first name",
                },
              ]}
            >
              <Input size="large" placeholder="First Name" />
            </Form.Item>
          </Col>

          {/* LAST */}
          <Col xs={24} md={10}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Enter last name",
                },
              ]}
            >
              <Input size="large" placeholder="Last Name" />
            </Form.Item>
          </Col>

          {/* EMAIL */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                },
                {
                  type: "email",
                  message: "Enter valid email",
                },
              ]}
            >
              <Input size="large" placeholder="example@gmail.com" />
            </Form.Item>

            <Text className="text-xs text-[#777]">
              Booking voucher will be sent here
            </Text>
          </Col>

          {/* MOBILE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Enter mobile",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Enter valid mobile",
                },
              ]}
            >
              <Input size="large" placeholder="9876543210" />
            </Form.Item>
          </Col>
        </Row>

        <div className="mt-3">
          <Button
            htmlType="submit"
            type="primary"
            className="!h-[46px] !rounded-xl !bg-[#0f766e]"
          >
            Save Guest Details
          </Button>
        </div>
      </Form>
    </Card>
  );
}
