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
import { createRole, updateRole } from "@/services/role.service";
import { getModulesFromMenu } from "@/utils/module.util";

const { Text } = Typography;
const { TextArea } = Input;

export default function RoleFormModal({ open, setOpen, refresh, editData }) {
  const [form] = Form.useForm();

  const {
    token: { colorBgContainer, colorBorder, borderRadiusLG },
  } = theme.useToken();

  const modules = getModulesFromMenu(menuItems);

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
      if (editData) {
        await updateRole(editData._id, values);
      } else {
        await createRole(values);
      }

      form.resetFields();
      setOpen(false);
      refresh();
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
      forceRender
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ permissions: {} }}
      >
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            paddingRight: 6,
          }}
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[
              { required: true, message: "Role name is required" },
              { min: 3, message: "Minimum 3 characters required" },
            ]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 200, message: "Max 200 characters allowed" }]}
          >
            <TextArea
              rows={3}
              placeholder="Enter role description (optional)"
            />
          </Form.Item>

          <Divider>Permissions</Divider>

          {modules.map((module) => (
            <div
              key={module.key}
              style={{
                marginBottom: 16,
                padding: 14,
                borderRadius: borderRadiusLG,
                border: `1px solid ${colorBorder}`,
                background: colorBgContainer,
              }}
            >
              <Text strong style={{ textTransform: "capitalize" }}>
                {module.label}
              </Text>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                {module.actions.map((action) => (
                  <Form.Item
                    key={action}
                    name={["permissions", module.key, action]}
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox>{action}</Checkbox>
                  </Form.Item>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "sticky",
            bottom: 0,
            paddingTop: 12,
            background: colorBgContainer,
          }}
        >
          <Button type="primary" htmlType="submit" block size="large">
            {editData ? "Update Role" : "Create Role"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
