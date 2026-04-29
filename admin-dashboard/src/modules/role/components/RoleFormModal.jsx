"use client";

import {
  Button,
  Checkbox,
  Divider,
  Empty,
  Form,
  Input,
  Modal,
  Typography,
  theme,
} from "antd";
import { useEffect } from "react";

import { menuItems } from "@/config/menuConfig";
import { moduleConfig } from "@/config/module.config";
import { createRole, updateRole } from "@/modules/role/api/role.service";
import { usePermission } from "@/modules/shared/hooks/usePermission"; // ✅ NEW
import { useQueryClient } from "@tanstack/react-query";

const { Text } = Typography;
const { TextArea } = Input;

export default function RoleFormModal({ open, setOpen, editData }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {
    token: { colorBgContainer, colorBorder, borderRadiusLG },
  } = theme.useToken();

  const { canCreate, canEdit, isAdmin } = usePermission("roles");

  const hasAccess = isAdmin || canCreate || canEdit;

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
    if (open && hasAccess) {
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
  }, [editData, open, form, hasAccess]);

  const onFinish = async (values) => {
    if (!hasAccess) return;

    const payload = {
      ...values,
      type: "staff",
    };

    if (editData) {
      await updateRole(editData._id, payload);
    } else {
      await createRole(payload);
    }

    queryClient.invalidateQueries({ queryKey: ["roles"] });

    form.resetFields();
    setOpen(false);
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
      {!hasAccess ? (
        <Empty description="No permission to manage roles" />
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ permissions: {} }}
        >
          <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
            {/* NAME */}
            <Form.Item
              name="name"
              label="Role Name"
              rules={[{ required: true }]}
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
                        disabled={
                          (!canEdit && !isAdmin) ||
                          (action !== "read" &&
                            !permissions?.[module.key]?.read)
                        }
                        checked={permissions?.[module.key]?.[action] || false}
                        onChange={(e) => {
                          const checked = e.target.checked;

                          const current =
                            form.getFieldValue("permissions") || {};

                          const modulePerm = current[module.key] || {};

                          const updated = {
                            ...current,
                            [module.key]: {
                              ...modulePerm,
                              [action]: checked,
                            },
                          };

                          if (action === "read" && !checked) {
                            updated[module.key].update = false;
                            updated[module.key].delete = false;
                            updated[module.key].write = false;
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

          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={!canCreate && !canEdit && !isAdmin}
          >
            {editData ? "Update Role" : "Create Role"}
          </Button>
        </Form>
      )}
    </Modal>
  );
}
