"use client";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Popconfirm,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { getLevelConfig } from "../data/MarkupsData";
const { Text } = Typography;

export default function MarkupTable({
  markups,
  isLoading,
  meta,
  page,
  limit,
  setPage,
  setLimit,
  deleteMarkup,
  updateStatus,
  handleEdit,
}) {
  const renderTarget = (record) => {
    const formatDate = (date) => {
      if (!date) return null;
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    };

    const config = getLevelConfig(record)[record?.level];
    if (!config) return "-";
    const hasDateRange = record?.startDate && record?.endDate;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            minWidth: 0,
          }}
        >
          {/* TAG */}

          <Tag
            icon={config?.icon}
            color={config?.color}
            style={{
              margin: 0,
              borderRadius: 999,
              fontWeight: 600,
              paddingInline: 10,
              height: 26,
              display: "flex",
              alignItems: "center",
              fontSize: 11,
              flexShrink: 0,
            }}
          >
            {config?.label}
          </Tag>

          {/* CONTENT */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              minWidth: 0,
              flex: 1,
            }}
          >
            {/* TITLE */}

            <Text
              strong
              style={{
                fontSize: 14,
                lineHeight: 1.35,
                wordBreak: "break-word",
              }}
            >
              {config?.value}
            </Text>

            {/* SUBTITLE */}

            <Text
              type="secondary"
              style={{
                fontSize: 12,
                lineHeight: 1.4,
              }}
            >
              {config?.subtitle}
            </Text>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {hasDateRange ? (
            <Tag
              color="gold"
              style={{
                margin: 0,
                borderRadius: 999,
                fontSize: 11,
                paddingInline: 10,
                fontWeight: 500,
              }}
            >
              {formatDate(record?.startDate)} → {formatDate(record?.endDate)}
            </Tag>
          ) : (
            <Tag
              style={{
                margin: 0,
                borderRadius: 999,
                fontSize: 11,
                paddingInline: 10,
                color: "rgba(255,255,255,0.45)",
                borderColor: "rgba(255,255,255,0.08)",
                background: "transparent",
              }}
            >
              No Expiry
            </Tag>
          )}
        </div>
      </div>
    );
  };

  // ================= COLUMNS =================

  const columns = [
    {
      title: "Target",
      dataIndex: "level",
      width: 260,
      ellipsis: true,
      render: (_, record) => renderTarget(record),
    },
    {
      title: "Markup",
      width: 120,
      align: "center",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            lineHeight: 1.2,
          }}
        >
          <Text strong>
            {record?.markupType === "percentage"
              ? `${record?.markupValue}%`
              : `₹${record?.markupValue}`}
          </Text>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
              textTransform: "capitalize",
            }}
          >
            {record?.markupType}
          </Text>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      width: 110,
      align: "center",
      render: (val) =>
        val ? (
          <Tag
            color="green"
            style={{
              margin: 0,
            }}
          >
            Active
          </Tag>
        ) : (
          <Tag
            color="red"
            style={{
              margin: 0,
            }}
          >
            Inactive
          </Tag>
        ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      width: 120,
      responsive: ["md"],
      render: (val) => new Date(val).toLocaleDateString("en-IN"),
    },
    {
      title: "Actions",
      width: 180,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {" "}
          {/* EDIT */}{" "}
          <Tooltip title="Edit">
            {" "}
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />{" "}
          </Tooltip>{" "}
          {/* DELETE */}{" "}
          <Popconfirm
            title="Delete markup?"
            description="This action cannot be undone."
            onConfirm={() => deleteMarkup.mutate(record?._id)}
          >
            {" "}
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={deleteMarkup.isPending}
            />{" "}
          </Popconfirm>{" "}
          {/* STATUS */}{" "}
          <Switch
            checked={record?.isActive}
            loading={updateStatus.isPending}
            onChange={(checked) =>
              updateStatus.mutate({
                id: record?._id,
                data: { isActive: checked },
              })
            }
          />{" "}
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={markups}
      loading={isLoading}
      bordered
      size="middle"
      scroll={{
        x: 820,
      }}
      pagination={{
        current: page,
        pageSize: limit,
        total: meta?.totalRecords || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (current, pageSize) => {
          setPage(current);
          setLimit(pageSize);
        },
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        responsive: true,
      }}
      locale={{
        emptyText: <Empty description="No markups found" />,
      }}
    />
  );
}
