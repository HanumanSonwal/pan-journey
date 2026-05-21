"use client";

import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

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
  // ================= TARGET =================

  const renderTarget = (record) => {
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minWidth: 0,
    };

    const tagStyle = {
      width: "fit-content",
      margin: 0,
      borderRadius: 999,
      fontWeight: 600,
      paddingInline: 10,
    };

    const secondaryTextStyle = {
      fontSize: 12,
      lineHeight: 1.2,
    };

    // ================= WORLDWIDE =================

    if (record?.level === "worldwide") {
      return (
        <div style={containerStyle}>
          <Tag icon={<GlobalOutlined />} color="purple" style={tagStyle}>
            Worldwide
          </Tag>

          <Text
            strong
            style={{
              fontSize: 14,
            }}
          >
            Global Pricing
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            Applied on all locations
          </Text>
        </div>
      );
    }

    // ================= COUNTRY =================

    if (record?.level === "country") {
      return (
        <div style={containerStyle}>
          <Tag color="blue" style={tagStyle}>
            Country
          </Tag>

          <Text
            strong
            style={{
              fontSize: 14,
            }}
          >
            {record?.countryName || record?.countryCode}
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            Country level pricing
          </Text>
        </div>
      );
    }

    // ================= STATE =================

    if (record?.level === "state") {
      return (
        <div style={containerStyle}>
          <Tag color="orange" style={tagStyle}>
            State
          </Tag>

          <Text
            strong
            style={{
              fontSize: 14,
            }}
          >
            {record?.stateName}
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            {record?.countryCode}
          </Text>
        </div>
      );
    }

    // ================= CITY =================

    if (record?.level === "city") {
      return (
        <div style={containerStyle}>
          <Tag color="cyan" style={tagStyle}>
            City
          </Tag>

          <Text
            strong
            ellipsis
            style={{
              fontSize: 14,
              maxWidth: 220,
            }}
          >
            {record?.cityName}
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            City specific pricing
          </Text>
        </div>
      );
    }

    // ================= HOTEL =================

    if (record?.level === "hotel") {
      return (
        <div style={containerStyle}>
          <Tag color="magenta" style={tagStyle}>
            Hotel
          </Tag>

          <Text
            strong
            ellipsis
            style={{
              fontSize: 14,
              maxWidth: 240,
            }}
          >
            {record?.hotelName}
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            Hotel specific pricing
          </Text>
        </div>
      );
    }

    // ================= SERVICE TAX =================

    if (record?.level === "serviceTax") {
      return (
        <div style={containerStyle}>
          <Tag color="gold" style={tagStyle}>
            Service Tax
          </Tag>

          <Text
            strong
            ellipsis
            style={{
              fontSize: 14,
              maxWidth: 240,
            }}
          >
            {record?.serviceTax}
          </Text>

          <Text type="secondary" style={secondaryTextStyle}>
            Applied on total booking amount
          </Text>
        </div>
      );
    }

    return "-";
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
