"use client";

import StaffFormModal from "@/components/staff-managment/StaffFormModal";
import { useStaff } from "@/hooks/staff/useStaff";
import { usePermission } from "@/hooks/usePermission"; // ✅ NEW
import { updateStaffStatus } from "@/services/user.service";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Card, Empty, Space, Switch, Table, Tag, Tooltip } from "antd";
import { useState } from "react";
import PermissionPopover from "../roles/PermissionPopover";

export default function StaffPage() {
  const { data, isLoading } = useStaff();
  const staff = data?.data || [];

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const { canRead, canCreate, canEdit, isAdmin } = usePermission("users");

  const canFetch = canRead || isAdmin;

  const handleStatusUpdate = async (id, newStatus) => {
    queryClient.setQueryData(["staff"], (old) => {
      if (!old) return old;
      return {
        ...old,
        data: old.data.map((u) =>
          u._id === id ? { ...u, isActive: newStatus } : u,
        ),
      };
    });

    await updateStaffStatus(id, {
      isActive: newStatus,
    });
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
      render: (_, r) =>
        r.role?.name ? (
          <Tag color="blue">{r.role.name}</Tag>
        ) : (
          <Tag>No Role</Tag>
        ),
    },

    {
      title: "Status",
      dataIndex: "isActive",
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },

    {
      title: "Permissions",
      render: (_, r) => {
        const perms = r.permissions || r.role?.permissions;
        return <PermissionPopover permissions={perms} />;
      },
    },

    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          {/* EDIT */}
          {canEdit && (
            <Tooltip title="Edit Staff">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          )}

          {/* STATUS TOGGLE */}
          {!record.isSystemRole && canEdit && (
            <Tooltip
              title={record.isActive ? "Deactivate Staff" : "Activate Staff"}
            >
              <Switch
                checked={!!record.isActive}
                onChange={(checked) => handleStatusUpdate(record._id, checked)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Staff Management"
      extra={
        canCreate && (
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
        )
      }
    >
      {canFetch ? (
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={staff}
          rowKey="_id"
        />
      ) : (
        <Empty description="No permission to view data" />
      )}

      <StaffFormModal open={open} setOpen={setOpen} editData={editData} />
    </Card>
  );
}
