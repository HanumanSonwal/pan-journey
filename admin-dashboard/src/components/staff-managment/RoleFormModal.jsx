"use client";

import { Modal, Form, Input, Checkbox, Button } from "antd";
import { createRole } from "@/services/role.service";
import { moduleConfig } from "@/config/module.config";

export default function RoleFormModal({ open, setOpen, refresh }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await createRole(values);
    form.resetFields();
    setOpen(false);
    refresh();
  };

  return (
    <Modal
      title="Create Role"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Role Name" required>
          <Input placeholder="Enter role name" />
        </Form.Item>

        {Object.entries(moduleConfig).map(([module, config]) => (
          <div key={module} style={{ marginBottom: 10 }}>
            <b>{config.label}</b>

            <div style={{ display: "flex", gap: 10 }}>
              {config.actions.map((action) => (
                <Form.Item
                  key={action}
                  name={["permissions", module, action]}
                  valuePropName="checked"
                >
                  <Checkbox>{action}</Checkbox>
                </Form.Item>
              ))}
            </div>
          </div>
        ))}

        <Button type="primary" htmlType="submit">
          Create Role
        </Button>
      </Form>
    </Modal>
  );
}