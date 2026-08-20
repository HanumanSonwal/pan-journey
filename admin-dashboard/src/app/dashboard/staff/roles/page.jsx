"use client";

import { EditOutlined, PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Card,
  Empty,
  Popover,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import { useRoles } from "@/modules/role/hooks/useRoles";
import { usePermission } from "@/modules/shared/hooks/usePermission";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PermissionPopover from "../../../../modules/shared/components/PermissionPopover";
const { Text } = Typography;

export default function RolesPage() {
  // ================= STATES =================

  const [openPopup, setOpenPopup] = useState(false);

  const router = useRouter();
  // ================= PERMISSIONS =================

  const { canRead, canCreate, canEdit, isAdmin } = usePermission("roles");
  const canFetch = canRead || isAdmin;

  // ================= API =================

  const { roles, isLoading, updateStatus } = useRoles(canFetch);

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
    {
      title: "Role",
      dataIndex: "name",
      width: 260,

      render: (_, record) => (
        <div className="flex flex-col gap-1">
          {/* ROLE NAME */}

          <Text strong className="text-sm">
            {record?.name}
          </Text>

          {/* SYSTEM ROLE */}

          {record?.isSystemRole && (
            <Tag
              color="gold"
              className="!m-0 !w-fit !rounded-full !text-[11px] !font-medium"
            >
              System Role
            </Tag>
          )}
        </div>
      ),
    },

    // ================= TYPE =================

    {
      title: "Type",
      dataIndex: "type",
      width: 140,
      align: "center",

      render: (val) => (
        <Tag
          color={getTypeColor(val)}
          className="!m-0 !rounded-full !px-3 !font-semibold !uppercase"
        >
          {val}
        </Tag>
      ),
    },

    // ================= DESCRIPTION =================

    {
      title: "Description",
      dataIndex: "description",
      width: 300,

      render: (description) => {
        if (!description) {
          return <Text type="secondary">-</Text>;
        }

        const isLong = description.length > 50;

        const content = (
          <div className="max-w-[350px] break-words leading-[1.6]">
            {description}
          </div>
        );

        if (!isLong) {
          return <Text>{description}</Text>;
        }

        return (
          <Popover
            title="Description"
            content={content}
            trigger="click"
            placement="topLeft"
            open={openPopup}
            onOpenChange={(visible) => setOpenPopup(visible)}
          >
            <div className="flex cursor-pointer flex-col gap-1">
              <Text ellipsis className="!block !max-w-[240px]">
                {description}
              </Text>

              <Tag
                color="blue"
                className="!m-0 !w-fit !cursor-pointer !rounded-full !text-[11px] !font-medium"
              >
                Click to view
              </Tag>
            </div>
          </Popover>
        );
      },
    },

    // ================= STATUS =================

    {
      title: "Status",
      dataIndex: "isActive",
      width: 130,
      align: "center",

      render: (val) =>
        val ? (
          <Tag color="green" className="!m-0 !rounded-full !font-medium">
            Active
          </Tag>
        ) : (
          <Tag color="red" className="!m-0 !rounded-full !font-medium">
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
              <div className="flex items-center justify-center gap-2.5">
                {/* EDIT */}

                <Tooltip title="Edit Role">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() =>
                      router.push(
                        `/dashboard/staff/create-role?id=${record._id}`,
                      )
                    }
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
        className="!rounded-[5px]"
        styles={{
          body: {
            paddingTop: 18,
          },
        }}
        title={
          <div className="flex flex-col gap-0.5">
            <Text strong className="!text-[18px]">
              Role Management
            </Text>

            <Text type="secondary" className="!text-[13px]">
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
              onClick={() => router.push("/dashboard/staff/create-role")}
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
    </>
  );
}
