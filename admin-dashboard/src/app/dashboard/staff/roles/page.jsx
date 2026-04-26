"use client";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Popover,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useState } from "react";

import RoleFormModal from "@/components/staff-managment/RoleFormModal";
import { useRoles } from "@/hooks/Role-module/useRoles";
import { useAuthStore } from "@/store/auth.store";
import { can } from "@/utils/permission.util";
import PermissionPopover from "./PermissionPopover";

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { permissions = {}, user } = useAuthStore();

  // 🔥 PERMISSIONS
  const canRead = can(permissions, "roles", "read", user);
  const canCreate = can(permissions, "roles", "write", user);
  const canEdit = can(permissions, "roles", "update", user);

  // 🔥 🔥 HOOK USE (MAIN PART)
  const { roles, isLoading, updateStatus } = useRoles(
    user?.role === "admin" || canRead,
  );

  // 🔥 EDIT
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },

    {
      title: "Type",
      dataIndex: "type",
      render: (val) => (
        <Tag
          color={val === "admin" ? "red" : val === "staff" ? "blue" : "green"}
        >
          {val.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "isActive",
      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },

    {
      title: "Description",
      dataIndex: "description",
      render: (text) =>
        text ? (
          <Popover
            title="Description"
            content={
              <div style={{ maxWidth: 300, whiteSpace: "pre-wrap" }}>
                {text}
              </div>
            }
            trigger="click"
          >
            <Tag color="blue" style={{ cursor: "pointer" }}>
              View
            </Tag>
          </Popover>
        ) : (
          "-"
        ),
    },

    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions) => <PermissionPopover permissions={permissions} />,
    },

    {
      title: "Created",
      dataIndex: "createdAt",
      render: (val) =>
        new Date(val).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },

    ...(canEdit
      ? [
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                {/* EDIT */}
                {canEdit && (
                  <Tooltip title="Edit Role">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(record)}
                    />
                  </Tooltip>
                )}

                {/* STATUS TOGGLE */}
                {!record.isSystemRole && (
                  <Tooltip
                    title={
                      record.isActive ? "Deactivate Role" : "Activate Role"
                    }
                  >
                    <Switch
                      checked={record.isActive}
                      onChange={(checked) =>
                        updateStatus({
                          id: record._id,
                          data: { isActive: checked },
                        })
                      }
                    />
                  </Tooltip>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <Card
      title="Role Management"
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
            Create Role
          </Button>
        )
      }
    >
      {user?.role === "admin" || canRead ? (
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="_id"
          loading={isLoading}
          bordered
          pagination={{ pageSize: 8 }}
        />
      ) : (
        <Empty description="No permission to view data" />
      )}

      <RoleFormModal open={open} setOpen={setOpen} editData={editData} />
    </Card>
  );
}
