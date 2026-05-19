"use client";

import { Button, Form, InputNumber, Modal, Select, theme } from "antd";

import { useMarkups } from "../hooks/useMarkups";
import LevelFields from "./LevelFields";

export default function MarkupFormModal({ open, setOpen }) {
  const [form] = Form.useForm();
  const level = Form.useWatch("level", form);
  const { createMarkup } = useMarkups();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = async (values) => {
    await createMarkup.mutateAsync(values);
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      title="Create Markup"
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      destroyOnHidden
      width={650}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: true,
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            padding: 16,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* LEVEL */}

          <Form.Item
            label="Markup Level"
            name="level"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Level"
              options={[
                {
                  label: "Worldwide",
                  value: "worldwide",
                },
                {
                  label: "Country",
                  value: "country",
                },
                {
                  label: "State",
                  value: "state",
                },
                {
                  label: "City",
                  value: "city",
                },
                {
                  label: "Hotel",
                  value: "hotel",
                },
              ]}
            />
          </Form.Item>

          {/* DYNAMIC FIELDS */}
          <LevelFields level={level} />
          {/* MARKUP TYPE */}
          <Form.Item
            label="Markup Type"
            name="markupType"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Type"
              options={[
                {
                  label: "Percentage",
                  value: "percentage",
                },
                {
                  label: "Fixed",
                  value: "fixed",
                },
              ]}
            />
          </Form.Item>
          {/* VALUE */}
          <Form.Item
            label="Markup Value"
            name="markupValue"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter markup value"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={createMarkup.isPending}
          >
            Create Markup
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
