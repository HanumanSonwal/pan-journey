"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Select, Table, theme } from "antd";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardPage = () => {
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const axisColor = "#9ca3af";

  // DATA
  const growthData = [
    { name: "Jan", users: 1200 },
    { name: "Feb", users: 1800 },
    { name: "Mar", users: 1500 },
    { name: "Apr", users: 2200 },
    { name: "May", users: 2600 },
  ];

  const bookingData = [
    { name: "Mon", bookings: 120 },
    { name: "Tue", bookings: 200 },
    { name: "Wed", bookings: 150 },
    { name: "Thu", bookings: 280 },
    { name: "Fri", bookings: 230 },
  ];

  const miniData = [{ v: 10 }, { v: 20 }, { v: 15 }, { v: 30 }, { v: 25 }];

  const tableData = [
    { key: 1, hotel: "Hotel Royal", bookings: 120, revenue: "₹12,000" },
    { key: 2, hotel: "City Inn", bookings: 90, revenue: "₹9,500" },
    { key: 3, hotel: "Luxury Stay", bookings: 60, revenue: "₹15,000" },
  ];

  const columns = [
    { title: "Hotel", dataIndex: "hotel" },
    { title: "Bookings", dataIndex: "bookings" },
    { title: "Revenue", dataIndex: "revenue" },
  ];

  return (
    <>
      {/* 🔥 HEADER */}
      <Row justify="space-between" align="middle" wrap style={{ gap: 10 }}>
        <h2 style={{ color: colorText, margin: 0 }}>Dashboard</h2>

        <Select
          defaultValue="month"
          style={{ width: 140 }}
          options={[
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "year", label: "This Year" },
          ]}
        />
      </Row>

      {/* 🔥 CARDS */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {[
          {
            title: "Revenue",
            value: "₹2,45,000",
            today: "₹12,400 today",
            change: "+12%",
            positive: true,
          },
          {
            title: "Bookings",
            value: "1,240",
            today: "86 today",
            change: "+8%",
            positive: true,
          },
          {
            title: "Users",
            value: "3,560",
            today: "45 new",
            change: "-3%",
            positive: false,
          },
          {
            title: "Conversion",
            value: "4.8%",
            today: "0.3% today",
            change: "+1.2%",
            positive: true,
          },
        ].map((item, i) => (
          <Col xs={24} sm={12} md={12} lg={6} key={i}>
            <Card
              variant="borderless"
              style={{
                borderRadius: 12,
                background: colorBgContainer,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "#6b7280", fontSize: 13 }}>{item.title}</p>

                <span
                  style={{
                    color: item.positive ? "#16a34a" : "#dc2626",
                    fontSize: 12,
                  }}
                >
                  {item.positive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {item.change}
                </span>
              </div>

              <h2 style={{ color: colorText, margin: "6px 0" }}>
                {item.value}
              </h2>

              <p style={{ fontSize: 12, color: "#9ca3af" }}>{item.today}</p>

              {/* MINI CHART */}
              <div style={{ height: 40, marginTop: 8 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniData}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={item.positive ? "#16a34a" : "#dc2626"}
                      fill={
                        item.positive
                          ? "rgba(22,163,74,0.1)"
                          : "rgba(220,38,38,0.1)"
                      }
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔥 CHARTS */}
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col xs={24} lg={16}>
          <Card
            title="User Growth"
            variant="borderless"
            style={{ borderRadius: 12, background: colorBgContainer }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={growthData}>
                <XAxis stroke={axisColor} dataKey="name" />
                <YAxis stroke={axisColor} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  fill="rgba(37,99,235,0.06)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Bookings"
            variant="borderless"
            style={{ borderRadius: 12, background: colorBgContainer }}
          >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={bookingData}>
                <XAxis stroke={axisColor} dataKey="name" />
                <YAxis stroke={axisColor} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#dc2626" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 🔥 TABLE */}
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Card
            title="Top Hotels"
            variant="borderless"
            style={{ borderRadius: 12, background: colorBgContainer }}
          >
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: "max-content" }} // 🔥 responsive fix
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
