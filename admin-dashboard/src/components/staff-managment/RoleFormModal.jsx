"use client";

import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Typography,
  theme,
} from "antd";
import { useEffect } from "react";

import { menuItems } from "@/config/menuConfig";
import { moduleConfig } from "@/config/module.config";
import { createRole, updateRole } from "@/services/role.service";
import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;
const { TextArea } = Input;

export default function RoleFormModal({ open, setOpen, editData }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgContainer, colorBorder, borderRadiusLG },
  } = theme.useToken();

  const extractModules = (items, result = new Set()) => {
    items.forEach((item) => {
      if (item.module) result.add(item.module);
      if (item.children) extractModules(item.children, result);
    });
    return result;
  };

  const menuModules = Array.from(extractModules(menuItems));

  const modules = menuModules.map((key) => ({
    key,
    label: moduleConfig[key]?.label || key,
    actions: moduleConfig[key]?.actions || ["read"],
  }));

  const permissions = Form.useWatch("permissions", form);

  useEffect(() => {
    if (open) {
      if (editData) {
        form.setFieldsValue({
          name: editData.name,
          description: editData.description,
          permissions: editData.permissions || {},
        });
      } else {
        form.resetFields();
      }
    }
  }, [editData, open, form]);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        type: "staff", // 🔥 force type
      };

      if (editData) {
        await updateRole(editData._id, payload);
      } else {
        await createRole(payload);
      }

      queryClient.invalidateQueries(["roles"]);
      form.resetFields();
      setOpen(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Modal
      title={editData ? "Edit Role" : "Create Role"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={720}
      destroyOnHidden
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ permissions: {} }}
      >
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: "Role name is required" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Divider>Permissions</Divider>

          {modules.map((module) => (
            <div
              key={module.key}
              style={{
                marginBottom: 16,
                padding: 12,
                border: `1px solid ${colorBorder}`,
                borderRadius: borderRadiusLG,
                background: colorBgContainer,
              }}
            >
              <Text strong>{module.label}</Text>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {module.actions.map((action) => (
                  <Form.Item
                    key={action}
                    name={["permissions", module.key, action]}
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox
                      checked={permissions?.[module.key]?.[action] || false}
                      disabled={
                        action !== "read" && !permissions?.[module.key]?.read
                      }
                      onChange={(e) => {
                        const checked = e.target.checked;

                        const current = form.getFieldValue("permissions") || {};

                        const modulePerm = current[module.key] || {};

                        const updated = {
                          ...current,
                          [module.key]: {
                            ...modulePerm,
                            [action]: checked,
                          },
                        };

                        // 🔥 read OFF → update/delete OFF
                        if (action === "read" && !checked) {
                          updated[module.key].update = false;
                          updated[module.key].delete = false;
                        }

                        form.setFieldsValue({ permissions: updated });
                      }}
                    >
                      {action}
                    </Checkbox>
                  </Form.Item>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button type="primary" htmlType="submit" block>
          {editData ? "Update Role" : "Create Role"}
        </Button>
      </Form>
    </Modal>
  );
}
