"use client";

import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  Popconfirm,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import { useMemo, useState } from "react";
import MarkupFormModal from "../componants/MarkupFormModal";
import { useMarkups } from "../hooks/useMarkups";
const { Text } = Typography;
export default function MarkupsPage() {
  // ================= STATES =================
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // ================= HOOKS =================

  const { markups, isLoading, deleteMarkup, updateStatus } = useMarkups();

  // ================= EDIT =================

  const handleEdit = (record) => {
    setEditData(record);
    setOpen(true);
  };

  // ================= FILTER OPTIONS =================

  const levelOptions = useMemo(() => {
    const levels = [...new Set(markups?.map((item) => item?.level))];
    return [
      {
        label: "All Levels",
        value: "all",
      },
      ...levels?.map((item) => ({
        label: item?.charAt(0)?.toUpperCase() + item?.slice(1),

        value: item,
      })),
    ];
  }, [markups]);

  const statusOptions = useMemo(
    () => [
      {
        label: "All Status",
        value: "all",
      },
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
    ],
    [],
  );

  // ================= SEARCH PLACEHOLDER =================

  const searchPlaceholder = useMemo(() => {
    switch (levelFilter) {
      case "country":
        return "Search country";
      case "state":
        return "Search state";
      case "city":
        return "Search city";
      case "hotel":
        return "Search hotel";
      default:
        return "Search";
    }
  }, [levelFilter]);
  // ================= SHOW SEARCH =================
  const showSearch = !["all", "worldwide"].includes(levelFilter);
  // ================= FILTERED DATA =================
  const filteredData = useMemo(() => {
    let data = [...markups];

    if (statusFilter !== "all") {
      data = data?.filter((item) =>
        statusFilter === "active" ? item?.isActive : !item?.isActive,
      );
    }

    if (levelFilter !== "all") {
      data = data?.filter((item) => item?.level === levelFilter);
    }

    // SEARCH

    if (showSearch && search?.trim()) {
      const keyword = search.toLowerCase();

      data = data?.filter((item) => {
        switch (levelFilter) {
          case "country":
            return item?.countryCode?.toLowerCase()?.includes(keyword);
          case "state":
            return item?.stateName?.toLowerCase()?.includes(keyword);
          case "city":
            return item?.cityName?.toLowerCase()?.includes(keyword);
          case "hotel":
            return item?.hotelName?.toLowerCase()?.includes(keyword);
          default:
            return true;
        }
      });
    }

    return data;
  }, [markups, statusFilter, levelFilter, search, showSearch]);

  // ================= TARGET =================

  const renderTarget = (record) => {
    // WORLDWIDE

    if (record?.level === "worldwide") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Tag
            icon={<GlobalOutlined />}
            color="purple"
            style={{
              width: "fit-content",
              marginInlineEnd: 0,
            }}
          >
            Worldwide
          </Tag>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
            }}
          >
            All Locations
          </Text>
        </div>
      );
    }

    // COUNTRY

    if (record?.level === "country") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Tag
            color="blue"
            style={{
              width: "fit-content",
              marginInlineEnd: 0,
            }}
          >
            Country
          </Tag>

          <Text strong>{record?.countryCode}</Text>
        </div>
      );
    }

    // STATE

    if (record?.level === "state") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Tag
            color="orange"
            style={{
              width: "fit-content",
              marginInlineEnd: 0,
            }}
          >
            State
          </Tag>

          <Text strong>{record?.stateName}</Text>

          <Text
            type="secondary"
            style={{
              fontSize: 12,
            }}
          >
            {record?.countryCode}
          </Text>
        </div>
      );
    }

    // CITY

    if (record?.level === "city") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Tag
            color="cyan"
            style={{
              width: "fit-content",
              marginInlineEnd: 0,
            }}
          >
            City
          </Tag>

          <Text strong>{record?.cityName}</Text>
        </div>
      );
    }

    // HOTEL

    if (record?.level === "hotel") {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Tag
            color="magenta"
            style={{
              width: "fit-content",
              marginInlineEnd: 0,
            }}
          >
            Hotel
          </Tag>

          <Text
            strong
            ellipsis
            style={{
              maxWidth: 240,
            }}
          >
            {record?.hotelName}
          </Text>
        </div>
      );
    }

    return "-";
  };

  const columns = [
    {
      title: "Target",
      render: (_, record) => renderTarget(record),
    },
    {
      title: "Markup",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Text strong>
            {record?.markupType === "percentage"
              ? `${record?.markupValue}%`
              : `₹${record?.markupValue}`}
          </Text>

          <Text type="secondary">{record?.markupType}</Text>
        </div>
      ),
    },
    {
      title: "Status",
      render: (_, record) =>
        record?.isActive ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (val) => new Date(val).toLocaleDateString("en-IN"),
    },
    {
      title: "Actions",
      width: 180,
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
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
            description="This action cannot be undone."
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
        </div>
      ),
    },
  ];

  return (
    <>
      {/* ================= TABLE ================= */}

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
        {/* ================= FILTERS ================= */}

        <Row
          gutter={12}
          style={{
            marginBottom: 16,
          }}
        >
          {/* STATUS */}

          <Col xs={24} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{
                width: "100%",
              }}
              options={statusOptions}
            />
          </Col>

          {/* LEVEL */}

          <Col xs={24} md={6}>
            <Select
              value={levelFilter}
              onChange={(value) => {
                setLevelFilter(value);

                setSearch("");
              }}
              style={{
                width: "100%",
              }}
              options={levelOptions}
            />
          </Col>

          {/* SEARCH */}

          {showSearch && (
            <Col xs={24} md={12}>
              <Input.Search
                allowClear
                value={search}
                placeholder={searchPlaceholder}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          )}
        </Row>

        {/* ================= TABLE ================= */}

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredData}
          loading={isLoading}
          bordered
          size="middle"
          scroll={{ x: 1000 }}
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
          }}
          locale={{
            emptyText: <Empty description="No markups found" />,
          }}
        />
      </Card>

      {/* ================= MODAL ================= */}

      <MarkupFormModal open={open} setOpen={setOpen} editData={editData} />
    </>
  );
}
