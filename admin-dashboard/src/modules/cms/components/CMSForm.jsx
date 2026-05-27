"use client";

import { Button, Col, Form, Input, Row, Select, Switch } from "antd";

import CMSImageUpload from "./CMSImageUpload";
import CMSSeoFields from "./CMSSeoFields";

import useCMSForm from "../hooks/useCMSForm";
import TiptapEditor from "./editor/TiptapEditor";
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
      <Row gutter={24}>
        {/* LEFT */}

        <Col xs={24} lg={16}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="template"
                label="Template"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  options={[
                    {
                      value: "content",
                      label: "Content",
                    },

                    {
                      value: "heroContent",
                      label: "Hero Content",
                    },

                    {
                      value: "marketing",
                      label: "Marketing",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
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
          <CMSImageUpload form={form} />
          <Form.Item name={["data", "content"]} label="Content">
            <TiptapEditor />
          </Form.Item>
        </Col>

        <Col xs={24} lg={8}>
          <CMSSeoFields />

          <Form.Item
            name="isPublished"
            label="Published"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            {id ? "Update Page" : "Create Page"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
