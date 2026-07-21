"use client";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";

import { theme } from "antd";
import Text from "antd/es/typography/Text";
import useCMSForm from "../hooks/useCMSForm";
import CMSBlocksBuilder from "./CMSBlocksBuilder";
import CMSSeoFields from "./CMSSeoFields";
import CMSCitySelector from "./entity-selector/CMSCitySelector";
import CMSHotelSelector from "./entity-selector/CMSHotelSelector";

export default function CMSForm({ id }) {
  const [form] = Form.useForm();
  const entityType = Form.useWatch("entityType", form);
  const title = Form.useWatch("title", form);
  const { handleSubmit, isSubmitting } = useCMSForm({
    id,
    form,
  });

  const showEntityId = entityType === "hotelCity" || entityType === "hotel";

  const {
    token: { colorBgContainer, colorBorderSecondary, colorTextSecondary },
  } = theme.useToken();

  /*
    PREVIEW
  */
  const handlePreview = () => {
    const values = form.getFieldsValue(true);
    const slug =
      values?.slug ||
      values?.title
        ?.toLowerCase()
        ?.trim()
        ?.replace(/[^a-z0-9\s-]/g, "")
        ?.replace(/\s+/g, "-");

    /*
    SAVE FIRST
  */
    if (!id) {
      message.warning("Save draft before preview");
      return;
    }
    if (!slug) {
      message.warning("Missing page slug");
      return;
    }
    const frontendUrl =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    let previewUrl = `${frontendUrl}/${slug}?preview=true`;
    if (values.entityType === "hotelCity") {
      previewUrl = `${frontendUrl}/hotels/${slug}?preview=true`;
    }
    if (values.entityType === "hotel") {
      previewUrl = `${frontendUrl}/hotel/${slug}?preview=true`;
    }
    window.open(previewUrl, "_blank");
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

              <p
                style={{
                  marginTop: 6,
                  marginBottom: 0,
                  color: colorTextSecondary,
                  fontSize: 14,
                }}
              >
                Configure page details and entity mapping for this page.
              </p>
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
                  <Input
                    size="large"
                    disabled
                    placeholder="Auto generated"
                    value={
                      form.getFieldValue("slug") ||
                      title
                        ?.toLowerCase()
                        ?.trim()
                        ?.replace(/[^a-z0-9\s-]/g, "")
                        ?.replace(/\s+/g, "-") ||
                      ""
                    }
                  />
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
                  disabled={!id}
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
