"use client";

import { Modal, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import { createStaff, updateStaff } from "@/services/user.service";
import { getRoles } from "@/services/role.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function StaffFormModal({ open, setOpen, editData }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // 🔥 roles dropdown
  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const roles = data?.data || [];

  useEffect(() => {
    if (open) {
      if (editData) {
        form.setFieldsValue({
          name: editData.name,
          email: editData.email,
          mobile: editData.mobile,
          role: editData.role?._id,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, editData]);

  const onFinish = async (values) => {
    if (editData) {
      await updateStaff(editData._id, values);
    } else {
      await createStaff(values);
    }

    queryClient.invalidateQueries(["staff"]);
    setOpen(false);
  };

  return (
    <Modal
      title={editData ? "Edit Staff" : "Create Staff"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile">
          <Input />
        </Form.Item>

        {!editData && (
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        {/* 🔥 ROLE SELECT */}
        <Form.Item name="role" label="Role">
          <Select placeholder="Select Role">
            {roles.map((r) => (
              <Select.Option key={r._id} value={r._id}>
                {r.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {editData ? "Update" : "Create"}
        </Button>
      </Form>
    </Modal>
  );
}