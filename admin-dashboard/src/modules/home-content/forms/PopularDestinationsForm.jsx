"use client";

import { useEffect } from "react";

import { App, Button, Card, Form, Input, Space } from "antd";

import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import ImageUpload from "@/modules/shared/imageUpload/ImageUpload";
import CitySelector from "@/modules/shared/selectors/CitySelector";

import { HOME_CONTENT_SECTIONS } from "../constants/homeContent.constants";
import TextArea from "antd/es/input/TextArea";

export default function PopularDestinationsForm({
  editingData,
  createHomeContent,
  updateHomeContent,
  onSuccess,
}) {
  const { message } = App.useApp();

  const [form] = Form.useForm();

  useEffect(() => {
    if (!editingData) {
      form.setFieldsValue({
        items: [{}],
      });

      return;
    }

    form.setFieldsValue({
      items: editingData.items,
    });
  }, [editingData, form]);

  const handleFinish = async (values) => {
    try {
      const payload = {
        sectionType: HOME_CONTENT_SECTIONS.POPULAR_DESTINATIONS,
        title: "Popular Destinations",
        items: values.items,
      };

      if (editingData?._id) {
        await updateHomeContent.mutateAsync({
          id: editingData._id,
          data: payload,
        });

        message.success("Popular Destinations updated successfully");
      } else {
        await createHomeContent.mutateAsync(payload);

        message.success("Popular Destinations created successfully");
      }

      form.resetFields();

      onSuccess?.();
    } catch (error) {
      console.error(error);

      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Card
                key={key}
                style={{
                  marginBottom: 20,
                }}
              >
                {/* Destination */}

                <Form.Item label="Destination" required>
                  <CitySelector
                    value={form.getFieldValue(["items", name, "cityId"])}
                    initialLabel={form.getFieldValue(["items", name, "city"])}
                    onChange={(city) => {
                      form.setFields([
                        {
                          name: ["items", name, "name"],
                          value: city.name,
                        },
                        {
                          name: ["items", name, "city"],
                          value: city.city,
                        },
                        {
                          name: ["items", name, "cityId"],
                          value: city.cityId,
                        },
                      ]);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name={[name, "description"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter description",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                {/* Hidden */}

                <Form.Item hidden name={[name, "name"]}>
                  <Input />
                </Form.Item>

                <Form.Item hidden name={[name, "city"]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  hidden
                  name={[name, "cityId"]}
                  rules={[
                    {
                      required: true,
                      message: "Please select destination",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                {/* Image */}

                <Form.Item
                  label="Image"
                  name={[name, "image"]}
                  rules={[
                    {
                      required: true,
                      message: "Please upload image",
                    },
                  ]}
                >
                  <ImageUpload />
                </Form.Item>

                {/* Alt */}

                <Form.Item
                  label="Alt Text"
                  name={[name, "alt"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter alt text",
                    },
                  ]}
                >
                  <Input placeholder="Enter alt text" />
                </Form.Item>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    disabled={fields.length === 1}
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              </Card>
            ))}

            <Button block icon={<PlusOutlined />} onClick={() => add({})}>
              Add Destination
            </Button>
          </>
        )}
      </Form.List>

      <Space
        style={{
          width: "100%",
          justifyContent: "flex-end",
          marginTop: 24,
        }}
      >
        <Button onClick={onSuccess}>Cancel</Button>

        <Button
          type="primary"
          htmlType="submit"
          loading={createHomeContent.isPending || updateHomeContent.isPending}
        >
          {editingData ? "Update" : "Create"}
        </Button>
      </Space>
    </Form>
  );
}
