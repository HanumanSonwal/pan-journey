"use client";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Space, Switch, Table, Tag, Tooltip } from "antd";
import { useState } from "react";

import RoleFormModal from "@/modules/role/components/RoleFormModal";
import { useRoles } from "@/modules/role/hooks/useRoles";
import { usePermission } from "@/modules/shared/hooks/usePermission";
import PermissionPopover from "../../../../modules/shared/components/PermissionPopover";

export default function RolesPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { canRead, canCreate, canEdit, isAdmin } = usePermission("roles");

  const canFetch = canRead || isAdmin;

  const { roles, isLoading, updateStatus } = useRoles(canFetch);

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
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions) => <PermissionPopover permissions={permissions} />,
    },
    ...(canEdit
      ? [
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Tooltip title="Edit Role">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                  />
                </Tooltip>

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
      {canFetch ? (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={roles}
            rowKey="_id"
            loading={isLoading}
            bordered
            size="middle"
            scroll={{ x: 900 }}
            pagination={{ pageSize: 8 }}
          />
        </div>
      ) : (
        <Empty description="No permission to view data" />
      )}

      <RoleFormModal open={open} setOpen={setOpen} editData={editData} />
    </Card>
  );
}
