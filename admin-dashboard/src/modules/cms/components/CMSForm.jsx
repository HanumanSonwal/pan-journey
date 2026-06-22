"use client";

import { Button, Card, Col, Form, Input, Row, Select, Switch } from "antd";

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
  const showCity = entityType === "hotelCity" || entityType === "hotel";
  const showHotel = entityType === "hotel";
  const showEntityId = entityType === "hotelCity" || entityType === "hotel";

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
            style={{
              borderRadius: 5,
            }}
          >
            <Form.Item
              name="title"
              label="Page Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter page title" size="large" />
            </Form.Item>

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

            <Row gutter={16}>
              <Col xs={24} md={16}>
                <Form.Item
                  name="entityType"
                  label="Entity Type"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
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
                        label: "City SEO",
                      },
                      {
                        value: "hotel",
                        label: "Hotel SEO",
                      },
                      {
                        value: "marketing",
                        label: "Marketing",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  name="isPublished"
                  label="Published"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            {showCity && <CMSCitySelector form={form} />}
            {showHotel && <CMSHotelSelector form={form} />}
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
              style={{
                borderRadius: 5,
              }}
            >
              <CMSSeoFields />

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 12,
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
                  {id ? "Update Page" : "Create Page"}
                </Button>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
