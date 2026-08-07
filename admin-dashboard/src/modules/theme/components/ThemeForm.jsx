"use client";

import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Switch,
  Typography,
} from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function ThemeForm({ theme, updateTheme }) {
  const { message } = App.useApp();

  const [form] = Form.useForm();

  const [preview, setPreview] = useState({});

  useEffect(() => {
    if (!theme) return;

    const values = {
      primaryColor: theme.primaryColor || "#FDA20F",
      secondaryColor: theme.secondaryColor || "#05144B",
      hoverColor: theme.hoverColor || "#0C2FB1",
      textPrimary: theme.textPrimary || "#05144B",
      textSecondary: theme.textSecondary || "#FDA20F",
      borderColor: theme.borderColor || "#051449",
      gradientStart: theme.gradientStart || "#05144B",
      gradientEnd: theme.gradientEnd || "#0C2FB1",
      whiteColor: theme.whiteColor || "#FFFFFF",
      isActive: theme.isActive ?? true,
    };

    form.setFieldsValue(values);
    setPreview(values);
  }, [theme, form]);

  const handleValuesChange = (_, allValues) => {
    setPreview((prev) => ({
      ...prev,
      ...allValues,
    }));
  };

  const handleFinish = async (values) => {
    try {
      await updateTheme.mutateAsync(values);
    } catch (error) {
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const renderColorField = (label, name) => (
    <Form.Item
      key={name}
      label={label}
      style={{
        marginBottom: 18,
      }}
    >
      <Row gutter={12} align="middle">
        <Col flex="55px">
          <input
            type="color"
            value={preview[name] || "#FFFFFF"}
            onChange={(e) => {
              form.setFieldValue(name, e.target.value);

              setPreview((prev) => ({
                ...prev,
                [name]: e.target.value,
              }));
            }}
            style={{
              width: 46,
              height: 46,
              border: "1px solid #d9d9d9",
              borderRadius: 8,
              cursor: "pointer",
              background: "white",
            }}
          />
        </Col>

        <Col flex="auto">
          <Form.Item
            name={name}
            noStyle
            rules={[
              {
                required: true,
                message: `${label} is required`,
              },
              {
                pattern: /^#([A-Fa-f0-9]{6})$/,
                message: "Invalid HEX color",
              },
            ]}
          >
            <Input size="large" placeholder="#FFFFFF" />
          </Form.Item>
        </Col>

        <Col flex="90px">
          <Text
            style={{
              fontWeight: 600,
            }}
          >
            {preview[name]}
          </Text>
        </Col>
      </Row>
    </Form.Item>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={16}>
          <Card title="Theme Colors" variant="outlined">
            {" "}
            {renderColorField("Primary Color", "primaryColor")}
            {renderColorField("Secondary Color", "secondaryColor")}
            {renderColorField("Hover Color", "hoverColor")}
            {renderColorField("Text Primary", "textPrimary")}
            {renderColorField("Text Secondary", "textSecondary")}
            {renderColorField("Border Color", "borderColor")}
            {renderColorField("Gradient Start", "gradientStart")}
            {renderColorField("Gradient End", "gradientEnd")}
            {renderColorField("White Color", "whiteColor")}
            <Form.Item
              name="isActive"
              label="Theme Status"
              valuePropName="checked"
              style={{
                marginTop: 25,
              }}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Card>
        </Col>

        {/* -------------------------------------------- */}
        {/* Live Preview */}
        {/* -------------------------------------------- */}

        <Col xs={24} xl={8}>
          <Card title="Live Preview" variant="outlined">
            <div
              style={{
                padding: 20,
                borderRadius: 12,
                background: `linear-gradient(
                    180deg,
                    ${preview.gradientStart},
                    ${preview.gradientEnd}
                )`,
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  color: preview.whiteColor,
                  marginBottom: 10,
                }}
              >
                Pan Journey
              </h3>

              <p
                style={{
                  color: preview.whiteColor,
                  opacity: 0.85,
                  marginBottom: 20,
                }}
              >
                Explore your next journey
              </p>

              <button
                type="button"
                style={{
                  background: preview.primaryColor,
                  color: preview.whiteColor,
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Book Now
              </button>
            </div>{" "}
            <div
              style={{
                border: `1px solid ${preview.borderColor}`,
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  color: preview.textPrimary,
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Heading Preview
              </div>

              <div
                style={{
                  color: preview.textSecondary,
                }}
              >
                This is secondary text preview.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                style={{
                  background: preview.secondaryColor,
                  color: preview.whiteColor,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                Primary Button
              </button>

              <button
                type="button"
                style={{
                  background: preview.hoverColor,
                  color: preview.whiteColor,
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                Hover Button
              </button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row
        justify="end"
        style={{
          marginTop: 24,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={updateTheme.isPending}
          style={{
            minWidth: 180,
          }}
        >
          Update Theme
        </Button>
      </Row>
    </Form>
  );
}
