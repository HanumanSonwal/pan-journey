"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Card,
  Empty,
  Popconfirm,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import RoleFormModal from "@/modules/role/components/RoleFormModal";
import { useRoles } from "@/modules/role/hooks/useRoles";
import { usePermission } from "@/modules/shared/hooks/usePermission";
import { useState } from "react";
import PermissionPopover from "../../../../modules/shared/components/PermissionPopover";
const { Text } = Typography;

export default function RolesPage() {
  // ================= STATES =================
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ================= PERMISSIONS =================

  const { canRead, canCreate, canEdit, isAdmin } = usePermission("roles");
  const canFetch = canRead || isAdmin;

  // ================= API =================

  const { roles, isLoading, updateStatus, deleteRole } = useRoles(canFetch);

  // ================= EDIT =================

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };
  // ================= DELETE =================

  const handleDelete = async (record) => {
    try {
      console.log("DELETE CLICKED:", record);
      console.log("ROLE ID:", record?._id);

      await deleteRole(record?._id);

      console.log("DELETE API COMPLETED");
    } catch (error) {
      console.error("DELETE FAILED:", error);
    }
  };
  // ================= STATUS COLORS =================

  const getTypeColor = (type) => {
    switch (type) {
      case "admin":
        return "red";
      case "staff":
        return "blue";
      default:
        return "green";
    }
  };

  // ================= COLUMNS =================

  const columns = [
    // ================= ROLE =================

    {
      title: "Role",
      dataIndex: "name",
      width: 260,

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* ROLE NAME */}

          <Text
            strong
            style={{
              fontSize: 14,
            }}
          >
            {record?.name}
          </Text>

          {/* SYSTEM ROLE */}

          {record?.isSystemRole && (
            <Tag
              color="gold"
              style={{
                width: "fit-content",
                margin: 0,
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              System Role
            </Tag>
          )}
        </div>
      ),
    },

    // ================= STATUS =================

    {
      title: "Status",
      dataIndex: "isActive",
      width: 130,
      align: "center",
      render: (val) =>
        val ? (
          <Tag
            color="green"
            style={{
              margin: 0,
              borderRadius: 999,
              fontWeight: 500,
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            color="red"
            style={{
              margin: 0,
              borderRadius: 999,
              fontWeight: 500,
            }}
          >
            Inactive
          </Tag>
        ),
    },

    // ================= PERMISSIONS =================

    {
      title: "Permissions",
      dataIndex: "permissions",
      width: 180,
      align: "center",
      render: (permissions) => <PermissionPopover permissions={permissions} />,
    },

    // ================= CREATED =================

    {
      title: "Created",
      dataIndex: "createdAt",
      width: 150,
      responsive: ["lg"],
      render: (val) =>
        val
          ? new Date(val).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
    },

    // ================= ACTIONS =================

    ...(canEdit
      ? [
          {
            title: "Actions",
            width: 170,
            align: "center",

            render: (_, record) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                {/* EDIT */}

                <Tooltip title="Edit Role">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                  />
                </Tooltip>

                {/* STATUS */}

                {!record?.isSystemRole && (
                  <Tooltip
                    title={
                      record?.isActive ? "Deactivate Role" : "Activate Role"
                    }
                  >
                    <Switch
                      checked={record?.isActive}
                      onChange={(checked) =>
                        updateStatus({
                          id: record?._id,

                          data: {
                            isActive: checked,
                          },
                        })
                      }
                    />
                  </Tooltip>
                )}
                {!record?.isSystemRole && (
                  <Popconfirm
                    title="Delete Role"
                    description={`Are you sure you want to delete "${record?.name}"?`}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                      danger: true,
                    }}
                    onConfirm={() => handleDelete(record)}
                  >
                    <Tooltip title="Delete Role">
                      <Button danger icon={<DeleteOutlined />} />
                    </Tooltip>
                  </Popconfirm>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* ================= CARD ================= */}

      <Card
        style={{
          borderRadius: 5,
        }}
        styles={{
          body: {
            paddingTop: 18,
          },
        }}
        title={
          <div
            style={{
              display: "flex",

              flexDirection: "column",

              gap: 2,
            }}
          >
            <Text
              strong
              style={{
                fontSize: 18,
              }}
            >
              Role Management
            </Text>

            <Text
              type="secondary"
              style={{
                fontSize: 13,
              }}
            >
              Manage roles and permissions for staff access
            </Text>
          </div>
        }
        extra={
          canCreate && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
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
        {/* ================= TABLE ================= */}

        {canFetch ? (
          <Table
            columns={columns}
            dataSource={roles}
            rowKey="_id"
            loading={isLoading}
            bordered
            size="middle"
            scroll={{
              x: 920,
            }}
            pagination={{
              pageSize: 8,

              showSizeChanger: false,

              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total}`,

              responsive: true,
            }}
            locale={{
              emptyText: <Empty description="No roles available" />,
            }}
          />
        ) : (
          <Empty description="No permission to view roles" />
        )}
      </Card>

      {/* ================= MODAL ================= */}

      <RoleFormModal open={open} setOpen={setOpen} editData={editData} />
    </>
  );
}
