"use client";

import {
  BookOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";

export default function Sidebar({ activeTab, setActiveTab }) {
  const topMenu = [
    { key: "profile", label: "My Profile", icon: <UserOutlined /> },
    { key: "documents", label: "Documents", icon: <FileTextOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
  ];
  const { data: session } = useSession();
  const user = session?.user;
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const bottomMenu = [
    { key: "bookings", label: "Booking History", icon: <BookOutlined /> },
    {
      key: "support",
      label: "Help & Support",
      icon: <CustomerServiceOutlined />,
    },
    { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
  ];

  return (
    <div className="w-70 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5">
      {/* 🔹 Profile Header */}
      <div className="flex items-center gap-4 mb-7">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#4A9BB5] flex items-center justify-center text-white text-xl font-bold">
          {user?.image ? (
            <img
              src={user.image}
              alt="avatar"
              className="w-full h-full object-cover"
              width="100%"
              height="100%"
            />
          ) : (
            getInitials(user?.name)
          )}
        </div>

        <div>
          <p className="font-semibold text-[22px] text-gray-700 mb-1!">
            {user?.name || "User"}
          </p>
          <p className="text-gray-700 text-[14px] font-medium">My Account</p>
        </div>
      </div>

      {/* 🔹 Top Menu */}
      <div className="flex flex-col gap-3">
        {topMenu.map((item) => {
          const isActive = activeTab === item.key;

          return (
            <div
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition
                ${
                  isActive
                    ? "border-[#4A9BB5] bg-[#4A9BB5]/10"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <div
                className={`flex items-center gap-3 ${
                  isActive ? "text-[#4A9BB5]" : "text-black"
                }`}
              >
                <span className="text-[18px]">{item.icon}</span>
                <span className="text-[15px] font-medium">{item.label}</span>
              </div>

              {/* Arrow */}
              <span
                className={`text-[16px] ${
                  isActive ? "text-[#4A9BB5]" : "text-gray-400"
                }`}
              >
                →
              </span>
            </div>
          );
        })}
      </div>

      {/* 🔹 Divider */}
      <div className="border-t my-5 border-gray-200" />

      {/* 🔹 Bottom Menu */}
      <div className="flex flex-col gap-2">
        {bottomMenu.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 transition text-black"
          >
            <span className="text-[18px]">{item.icon}</span>
            <span className="text-[15px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
