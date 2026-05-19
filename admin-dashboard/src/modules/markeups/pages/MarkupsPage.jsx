"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";

import { useState } from "react";
import MarkupFormModal from "../componants/MarkupFormModal";
import { useMarkups } from "../hooks/useMarkups";

export default function MarkupsPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const { markups, isLoading, deleteMarkup, updateStatus } = useMarkups();

  // ================= EDIT =================

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // ================= COLUMNS =================

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
      dataIndex: "hotelName",
    },

    {
      title: "Markup",

      render: (_, record) => (
        <strong>
          {record?.markupType === "percentage"
            ? `${record?.markupValue}%`
            : `₹${record?.markupValue}`}
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
          {/* EDIT */}
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          {/* DELETE */}

          <Popconfirm
            title="Delete markup?"
            onConfirm={() => deleteMarkup.mutate(record?._id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={deleteMarkup.isPending}
            />
          </Popconfirm>

          {/* STATUS */}

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
          onClick={() => {
            setEditData(null);

            setOpen(true);
          }}
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

      <MarkupFormModal open={open} setOpen={setOpen} editData={editData} />
    </Card>
  );
}
