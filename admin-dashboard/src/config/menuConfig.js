import {
  BookOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DollarOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Link from "next/link";

export const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
    module: "dashboard",
  },

  {
    key: "/dashboard/bookings",
    icon: <BookOutlined />,
    label: <Link href="/dashboard/bookings">Bookings</Link>,
    module: "bookings",
  },

  {
    key: "/dashboard/staff",
    icon: <UserAddOutlined />,
    label: "Staff Management",
    module: "staff", // ✅ FIX
    children: [
      {
        key: "/dashboard/staff/roles",
        label: <Link href="/dashboard/staff/roles">Roles</Link>,
      },
      {
        key: "/dashboard/staff/users",
        label: <Link href="/dashboard/staff/users">Users</Link>,
      },
    ],
  },

  {
    key: "/dashboard/calendar",
    icon: <CalendarOutlined />,
    label: <Link href="/dashboard/calendar">Calendar</Link>,
    module: "calendar", // ✅ FIX
  },

  {
    key: "/dashboard/users",
    icon: <UserOutlined />,
    label: <Link href="/dashboard/users">Users</Link>,
    module: "users", // ✅ FIX
  },

  {
    key: "/dashboard/revenue",
    icon: <DollarOutlined />,
    label: <Link href="/dashboard/revenue">Revenue</Link>,
    module: "revenue", // ✅ FIX
  },
];