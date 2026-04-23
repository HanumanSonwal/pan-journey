import {
  BookOutlined,
  CalendarOutlined,
  DashboardOutlined,
  DollarOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Link from "next/link";

export const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link href="/dashboard">Dashboard</Link>,
    roles: ["admin", "staff"],
  },

  {
    key: "/dashboard/bookings",
    icon: <BookOutlined />,
    label: <Link href="/dashboard/bookings">Bookings</Link>,
    roles: ["admin", "staff"],
  },

  {
    key: "/dashboard/staff",
    icon: <UserAddOutlined />,
    label: "Staff Management",
    roles: ["admin"], // 👈 important
    children: [
      {
        key: "/dashboard/staff/roles",
        label: <Link href="/dashboard/staff/roles">Create Role</Link>,
      },
      {
        key: "/dashboard/staff/users",
        label: <Link href="/dashboard/staff/users">Create User</Link>,
      },
    ],
  },

  {
    key: "/dashboard/calendar",
    icon: <CalendarOutlined />,
    label: <Link href="/dashboard/calendar">Calendar</Link>,
    roles: ["admin"],
  },

  {
    key: "/dashboard/users",
    icon: <UserOutlined />,
    label: <Link href="/dashboard/users">Users</Link>,
    roles: ["admin"],
  },

  {
    key: "/dashboard/revenue",
    icon: <DollarOutlined />,
    label: <Link href="/dashboard/revenue">Revenue</Link>,
    roles: ["admin"],
  },
];