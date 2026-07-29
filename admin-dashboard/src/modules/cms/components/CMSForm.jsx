"use client";

import { CopyOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tooltip,
  theme,
} from "antd";
import Text from "antd/es/typography/Text";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import useCMSForm from "../hooks/useCMSForm";
import CMSBlocksBuilder from "./CMSBlocksBuilder";
import CMSSeoFields from "./CMSSeoFields";
import CMSCitySelector from "./entity-selector/CMSCitySelector";
import CMSHotelSelector from "./entity-selector/CMSHotelSelector";
CopyOutlined;

export default function CMSForm({ id }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const entityType = Form.useWatch("entityType", form);
  const title = Form.useWatch("title", form);
  const hotelMeta = Form.useWatch(["data", "hotelMeta"], form);
  const cityMeta = Form.useWatch("cityMeta", form);

  const { handleSubmit, isSubmitting, previewSlug } = useCMSForm({
    id,
    form,
  });

  const showEntityId = entityType === "hotelCity" || entityType === "hotel";

  const {
    token: { colorBgContainer, colorBorderSecondary, colorTextSecondary },
  } = theme.useToken();

  const debouncedPreview = useMemo(
    () => debounce(previewSlug, 500),
    [previewSlug],
  );

  useEffect(() => {
    return () => {
      debouncedPreview.cancel();
    };
  }, [debouncedPreview]);

  useEffect(() => {
    if (id) return;

    if (entityType === "static" || entityType === "marketing") {
      if (title) {
        debouncedPreview();
      }
    }

    if (entityType === "hotelCity") {
      if (cityMeta?.destination) {
        debouncedPreview();
      }
    }

    if (entityType === "hotel") {
      if (hotelMeta?.hotelName) {
        debouncedPreview();
      }
    }
  }, [entityType, title, cityMeta, hotelMeta, id]);

  /*
    PREVIEW
  */
  const handlePreview = () => {
    const values = form.getFieldsValue(true);

    if (!id) {
      message.warning("Save draft before preview");
      return;
    }

    if (!values.url) {
      message.warning("Preview URL not found");
      return;
    }

    const frontendUrl = (
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
    ).replace(/\/+$/, "");

    window.open(`${frontendUrl}${values.url}?preview=true`, "_blank");
  };

  const slug = Form.useWatch("slug", form);

  const url = Form.useWatch("url", form);

  const handleCopySlug = async () => {
    if (!url) return;

    const baseUrl = (
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
    ).replace(/\/+$/, "");

    await navigator.clipboard.writeText(`${baseUrl}${url}`);

    message.success("URL copied successfully");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        isPublished: true,
        entityType: "static",
      }}
    >
      <Row gutter={[24, 24]}>
        {/* LEFT */}

        <Col xs={24} lg={16}>
          <Card
            variant={false}
            style={{
              borderRadius: 5,
              background: colorBgContainer,
            }}
          >
            {/* HEADER */}
            <div
              style={{
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: `1px solid ${colorBorderSecondary}`,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                Page Information
              </h2>
            </div>

            <Form.Item
              name="entityType"
              label="Entity Type"
              rules={[{ required: true }]}
            >
              <Select
                size="large"
                options={[
                  {
                    value: "static",
                    label: "Static Page",
                  },
                  {
                    value: "hotelCity",
                    label: "City Pages",
                  },
                  {
                    value: "hotel",
                    label: "Hotel Pages",
                  },
                  {
                    value: "marketing",
                    label: "Marketing",
                  },
                ]}
              />
            </Form.Item>

            <Text type="secondary">
              Select what kind of page you want to create.
            </Text>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="title"
                  label="Page Title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter page title" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Slug">
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <Input
                      size="large"
                      value={url}
                      disabled
                      placeholder="Auto generated"
                      style={{
                        flex: 1,
                      }}
                    />

                    <Tooltip title="Copy URL">
                      <Button
                        icon={<CopyOutlined />}
                        onClick={handleCopySlug}
                        disabled={!url}
                      />
                    </Tooltip>
                  </div>
                </Form.Item>

                <Form.Item name="url" hidden>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            {entityType === "hotelCity" && <CMSCitySelector form={form} />}

            {entityType === "hotel" && (
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <CMSCitySelector form={form} />
                </Col>

                <Col xs={24} md={12}>
                  <CMSHotelSelector form={form} />
                </Col>
              </Row>
            )}

            {showEntityId && (
              <>
                <Form.Item name="entityId" hidden>
                  <Input />
                </Form.Item>

                <Form.Item name="cityMeta" hidden>
                  <Input />
                </Form.Item>
              </>
            )}
          </Card>

          <div
            style={{
              marginTop: 20,
            }}
          >
            <CMSBlocksBuilder form={form} />
          </div>
        </Col>

        {/* RIGHT */}

        <Col xs={24} lg={8}>
          <div
            style={{
              position: "sticky",
              top: 20,
            }}
          >
            <Card
              title="SEO Settings"
              variant={false}
              style={{
                borderRadius: 5,
                background: colorBgContainer,
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <CMSSeoFields />

              <Form.Item
                name="isPublished"
                label="Published"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Space
                orientation="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Button
                  block
                  size="large"
                  onClick={handlePreview}
                  disabled={!form.getFieldValue("url")}
                >
                  Preview
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isSubmitting}
                >
                  {id ? "Update Page" : "Publish Page"}
                </Button>
              </Space>
            </Card>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
