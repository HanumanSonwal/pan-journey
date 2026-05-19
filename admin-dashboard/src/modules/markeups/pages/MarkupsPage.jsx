"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Switch, Table, Tag } from "antd";
import { useState } from "react";
import MarkupFormModal from "../componants/MarkupFormModal";
import { useMarkups } from "../hooks/useMarkups";

export default function MarkupsPage() {
  const [open, setOpen] = useState(false);
  const { markups, isLoading } = useMarkups();
  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      render: (val) => <Tag color="blue">{val?.toUpperCase()}</Tag>,
    },
    {
      title: "Country",
      dataIndex: "countryCode",
    },
    {
      title: "State",
      dataIndex: "stateName",
    },
    {
      title: "City",
      dataIndex: "cityName",
    },
    {
      title: "Hotel",
      dataIndex: "hotelId",
    },
    {
      title: "Markup",
      render: (_, record) => (
        <strong>
          {record.markupType === "percentage"
            ? `${record.markupValue}%`
            : `₹${record.markupValue}`}
        </strong>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",

      render: (val) =>
        val ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>,
    },
    {
      title: "Actions",

      render: (_, record) => (
        <Space>
          <Switch checked={record.isActive} />
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Markup Management"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Create Markup
        </Button>
      }
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={markups}
        loading={isLoading}
        bordered
        scroll={{ x: 1000 }}
      />
      <MarkupFormModal open={open} setOpen={setOpen} />
    </Card>
  );
}
