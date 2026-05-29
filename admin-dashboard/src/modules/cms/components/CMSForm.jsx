"use client";

import { Button, Card, Col, Form, Input, Row, Select, Switch } from "antd";

import CMSSeoFields from "./CMSSeoFields";

import useCMSForm from "../hooks/useCMSForm";
import CMSBlocksBuilder from "./CMSBlocksBuilder";
import CMSCitySelector from "./entity-selector/CMSCitySelector";
import CMSHotelSelector from "./entity-selector/CMSHotelSelector";

export default function CMSForm({ id }) {
  const [form] = Form.useForm();
  const entityType = Form.useWatch("entityType", form);
  const { handleSubmit, isSubmitting } = useCMSForm({
    id,
    form,
  });
  const showCity = entityType === "hotelCity" || entityType === "hotel";
  const showHotel = entityType === "hotel";
  const showEntityId = entityType === "hotelCity" || entityType === "hotel";

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
              borderRadius: 16,
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
                borderRadius: 16,
              }}
            >
              <CMSSeoFields />

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={isSubmitting}
              >
                {id ? "Update Page" : "Create Page"}
              </Button>
            </Card>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
