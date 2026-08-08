"use client";

import { Button, Card, Space, Typography } from "antd";

const { Title, Text } = Typography;

export default function ThemePreview({ theme }) {
  return (
    <Card
      title="Theme Preview"
      style={{
        marginBottom: 24,
      }}
    >
      <Space orientation="vertical" size={18} style={{ width: "100%" }}>
        {/* Heading */}
        <div>
          <Title
            level={4}
            style={{
              color: theme?.textPrimary,
              marginBottom: 4,
            }}
          >
            Pan Journey
          </Title>

          <Text
            style={{
              color: theme?.textSecondary,
            }}
          >
            Explore the world with your own theme.
          </Text>
        </div>

        {/* Buttons */}
        <Space>
          <Button
            type="primary"
            style={{
              background: theme?.secondaryColor,
              borderColor: theme?.secondaryColor,
              color: theme?.whiteColor,
            }}
          >
            Primary Button
          </Button>

          <Button
            style={{
              borderColor: theme?.primaryColor,
              color: theme?.primaryColor,
            }}
          >
            Secondary Button
          </Button>
        </Space>

        {/* Gradient */}
        <div
          style={{
            height: 80,
            borderRadius: 10,
            background: `linear-gradient(
              180deg,
              ${theme?.gradientStart},
              ${theme?.gradientEnd}
            )`,
          }}
        />

        {/* Border Example */}
        <div
          style={{
            padding: 18,
            borderRadius: 10,
            border: `1px solid ${theme?.borderColor}`,
          }}
        >
          Border Preview
        </div>
      </Space>
    </Card>
  );
}
