"use client";

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Empty, Popconfirm, Table, Tag, Tooltip } from "antd";
export default function CMSTable({
  pages,
  meta,
  page,
  limit,
  setPage,
  setLimit,
  isLoading,
  deleteCMS,
}) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      width: 180,
      render: (val) => <Tag>/{val}</Tag>,
    },
    {
      title: "Type",
      dataIndex: "entityType",
      width: 120,
      render: (val) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      width: 120,
      render: (val) =>
        val ? <Tag color="green">Published</Tag> : <Tag color="red">Draft</Tag>,
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      width: 140,
      render: (val) => new Date(val).toLocaleDateString("en-IN"),
    },
    {
      title: "Actions",
      width: 180,

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
              href={`/dashboard/cms/edit/${record._id}`}
            />
          </Tooltip>

          <Tooltip title="Preview">
            <Button
              icon={<EyeOutlined />}
              href={`/${record.slug}`}
              target="_blank"
            />
          </Tooltip>

          <Popconfirm
            title="Delete page?"
            onConfirm={async () => {
              try {
                await deleteCMS.mutateAsync(record._id);
              } catch {}
            }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={
                deleteCMS.variables === record._id && deleteCMS.isPending
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
      columns={columns}
      dataSource={pages}
      loading={isLoading}
      bordered
      size="middle"
      scroll={{
        x: 900,
      }}
      pagination={{
        current: page,
        pageSize: limit,
        total: meta?.total || 0,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50"],
        onChange: (current, pageSize) => {
          setPage(current);
          setLimit(pageSize);
        },
      }}
      locale={{
        emptyText: <Empty description="No CMS pages found" />,
      }}
    />
  );
}
