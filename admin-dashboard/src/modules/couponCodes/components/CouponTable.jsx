"use client";

import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  message,
  Popconfirm,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

const { Text } = Typography;

export default function CouponTable({
  coupons,
  meta,
  page,
  limit,
  setPage,
  setLimit,
  isLoading,
  updateStatus,
  deleteCoupon,
  handleEdit,
}) {
  // ================= COLUMNS =================
  const handleCopy = async (code) => {
    await navigator.clipboard.writeText(code);

    message.success("Coupon copied");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const getCouponStatus = (startDate, endDate) => {
    const today = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return {
        label: "Upcoming",
        color: "gold",
      };
    }

    if (today > end) {
      return {
        label: "Expired",
        color: "red",
      };
    }

    return {
      label: "Running",
      color: "green",
    };
  };
  const columns = [
    {
      title: "Coupon",
      width: 240,

      render: (_, record) => (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Tag
              color="blue"
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {record?.code}
            </Tag>

            <Tooltip title="Copy Coupon">
              <Button
                type="text"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopy(record?.code)}
              />
            </Tooltip>
          </div>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
            }}
          >
            {record?.title}
          </Text>
        </div>
      ),
    },

    // ================= MODULES =================

    {
      title: "Modules",
      width: 180,
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {record?.applicableModules?.map((item) => (
            <Tag
              key={item}
              color="blue"
              style={{
                textTransform: "capitalize",
                margin: 0,
              }}
            >
              {item}
            </Tag>
          ))}
        </div>
      ),
    },

    {
      title: "Validity",
      width: 250,

      render: (_, record) => {
        const status = getCouponStatus(record?.startDate, record?.endDate);

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Text strong>
              {formatDate(record?.startDate)} → {formatDate(record?.endDate)}
            </Text>

            <Tag
              color={status.color}
              style={{
                width: "fit-content",
                margin: 0,
                borderRadius: 999,
                fontWeight: 500,
              }}
            >
              {status.label}
            </Tag>
          </div>
        );
      },
    },

    // ================= DISCOUNT =================

    {
      title: "Discount",
      width: 130,
      align: "center",

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Text strong>
            {record?.discountType === "percentage"
              ? `${record?.discountValue}%`
              : `₹${record?.discountValue}`}
          </Text>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
              textTransform: "capitalize",
            }}
          >
            {record?.discountType}
          </Text>
        </div>
      ),
    },

    // ================= MINIMUM =================

    {
      title: "Min Amount",
      width: 130,
      align: "center",

      render: (_, record) => <Text strong>₹{record?.minAmount}</Text>,
    },

    // ================= AUTO APPLY =================

    {
      title: "Auto Apply",
      width: 120,
      align: "center",

      render: (_, record) =>
        record?.isAutoApply ? (
          <Tag
            color="green"
            style={{
              margin: 0,
            }}
          >
            Yes
          </Tag>
        ) : (
          <Tag
            style={{
              margin: 0,
            }}
          >
            No
          </Tag>
        ),
    },

    // ================= STATUS =================

    {
      title: "Status",
      width: 170,
      align: "center",

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Switch
            checked={record?.isActive}
            loading={updateStatus.isPending}
            onChange={(checked) =>
              updateStatus.mutate({
                id: record?._id,
                data: {
                  isActive: checked,
                },
              })
            }
          />
        </div>
      ),
    },

    // ================= CREATED =================

    {
      title: "Created",
      dataIndex: "createdAt",
      width: 130,
      responsive: ["md"],

      render: (date) => new Date(date).toLocaleDateString("en-IN"),
    },

    // ================= ACTION =================

    {
      title: "Actions",
      width: 140,

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Delete Coupon?"
            description="This action cannot be undone."
            onConfirm={() => deleteCoupon.mutate(record?._id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={
                deleteCoupon.isPending && deleteCoupon.variables === record?._id
              }
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      bordered
      size="middle"
      columns={columns}
      dataSource={coupons}
      loading={isLoading}
      scroll={{
        x: 1100,
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
      }}
      locale={{
        emptyText: <Empty description="No coupons found" />,
      }}
    />
  );
}
