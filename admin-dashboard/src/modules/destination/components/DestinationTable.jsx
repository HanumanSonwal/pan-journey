"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { App, Button, Empty, Popconfirm, Table, Tag, Tooltip } from "antd";

import { DESTINATION_TYPES } from "../constants/destination.constants";

export default function DestinationTable({
  destinations,
  isLoading,
  deleteDestination,
  canEdit,
  canDelete,
  onEdit,
}) {
  const { message } = App.useApp();

  const getTypeColor = (type) => {
    switch (type) {
      case DESTINATION_TYPES.YOUR_VIBE:
        return "blue";

      case DESTINATION_TYPES.POPULAR_DESTINATIONS:
        return "green";

      default:
        return "default";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case DESTINATION_TYPES.YOUR_VIBE:
        return "Your Vibe";

      case DESTINATION_TYPES.POPULAR_DESTINATIONS:
        return "Popular Destinations";

      default:
        return type;
    }
  };

  const columns = [
    {
      title: "Place Name",
      dataIndex: "placeName",
      key: "placeName",
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",

      render: (value) => (
        <Tag color={getTypeColor(value)}>{getTypeLabel(value)}</Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",

      render: (value) =>
        value ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },

    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",

      render: (value) => new Date(value).toLocaleDateString("en-IN"),
    },

    ...(canEdit || canDelete
      ? [
          {
            title: "Actions",
            key: "actions",
            width: 140,

            render: (_, record) => (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                {canEdit && (
                  <Tooltip title="Edit">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => onEdit(record)}
                    />
                  </Tooltip>
                )}

                {canDelete && (
                  <Popconfirm
                    title="Delete destination?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                      try {
                        await deleteDestination.mutateAsync(record._id);

                        message.success("Destination deleted successfully");
                      } catch {}
                    }}
                  >
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      loading={
                        deleteDestination.isPending &&
                        deleteDestination.variables === record._id
                      }
                    />
                  </Popconfirm>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <Table
      rowKey="_id"
      bordered
      size="middle"
      loading={isLoading}
      columns={columns}
      dataSource={destinations}
      pagination={false}
      locale={{
        emptyText: <Empty description="No destinations found" />,
      }}
    />
  );
}
