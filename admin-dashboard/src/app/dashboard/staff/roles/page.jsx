"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Card,
  Space,
  Tag,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  getRoles,
  deleteRole,
} from "@/services/role.service";

import RoleFormModal from "@/components/staff-managment/RoleFormModal";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await deleteRole(id);
    fetchRoles();
  };

  // 🔥 EDIT
  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // 🔥 PERMISSION RENDER
  const renderPermissions = (permissions) => {
    if (!permissions || Object.keys(permissions).length === 0) {
      return <Tag color="default">No Permissions</Tag>;
    }

    return Object.entries(permissions).map(([module, actions]) => {
      const enabledActions = Object.entries(actions)
        .filter(([_, val]) => val)
        .map(([key]) => key);

      return (
        <div key={module} style={{ marginBottom: 6 }}>
          <Tag color="blue">{module}</Tag>
          {enabledActions.length > 0 ? (
            enabledActions.map((act) => (
              <Tag key={act} color="green">
                {act}
              </Tag>
            ))
          ) : (
            <Tag color="red">No Access</Tag>
          )}
        </div>
      );
    });
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: renderPermissions,
    },
    {
      title: "System Role",
      dataIndex: "isSystemRole",
      render: (val) =>
        val ? <Tag color="purple">System</Tag> : <Tag>User</Tag>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
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
            <Popconfirm
              title="Are you sure delete this role?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Tooltip title="Delete Role">
                <Button danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Role Management"
      extra={
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
      }
    >
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 8 }}
      />

      <RoleFormModal
        open={open}
        setOpen={setOpen}
        refresh={fetchRoles}
        editData={editData} // 🔥 important for edit
      />
    </Card>
  );
}