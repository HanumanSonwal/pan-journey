"use client";

import { Table, Button, Card, Space, Tag, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteStaff } from "@/services/user.service";
import { useQueryClient } from "@tanstack/react-query";
import StaffFormModal from "@/components/staff-managment/StaffFormModal";
import { useStaff } from "@/hooks/staff/useStaff";

export default function StaffPage() {
  const { data, isLoading } = useStaff();
  const staff = data?.data || [];

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    await deleteStaff(id);
    queryClient.invalidateQueries(["staff"]);
  };

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Mobile", dataIndex: "mobile" },

    {
      title: "Role",
      render: (_, r) => r.role?.name || "No Role",
    },

    {
      title: "Permissions",
      render: (_, r) => {
        const perms = r.permissions || r.role?.permissions;

        if (!perms) return <Tag>No Access</Tag>;

        return Object.entries(perms).map(([mod, acts]) => {
          const enabled = Object.entries(acts)
            .filter(([_, v]) => v)
            .map(([k]) => k);

          return (
            <Tag key={mod}>
              {mod}:{enabled.join(",") || "none"}
            </Tag>
          );
        });
      },
    },

    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(r)} />
          <Popconfirm onConfirm={() => handleDelete(r._id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Staff Management"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add Staff
        </Button>
      }
    >
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={staff}
        rowKey="_id"
      />

      <StaffFormModal
        open={open}
        setOpen={setOpen}
        editData={editData}
      />
    </Card>
  );
}