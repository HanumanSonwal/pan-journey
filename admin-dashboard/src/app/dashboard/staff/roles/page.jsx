"use client";

import { useEffect, useState } from "react";
import { Table, Button, Card } from "antd";
import { getRoles } from "@/services/role.service";
import RoleFormModal from "@/components/staff-managment/RoleFormModal";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchRoles = async () => {
    const res = await getRoles();
    setRoles(res.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
    },
    {
      title: "System Role",
      dataIndex: "isSystemRole",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  return (
    <Card
      title="Role Management"
      extra={
        <Button type="primary" onClick={() => setOpen(true)}>
          Create Role
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        bordered
      />

      <RoleFormModal open={open} setOpen={setOpen} refresh={fetchRoles} />
    </Card>
  );
}