"use client";

import {
  UserOutlined,
  BookOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { key: "profile", label: "Profile", icon: <UserOutlined /> },
    { key: "bookings", label: "Bookings", icon: <BookOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "settings", label: "Settings", icon: <SettingOutlined /> },
  ];

  return (
    <div className="w-64 bg-white rounded-xl shadow-sm p-4 h-fit">
      <div className="flex flex-col gap-2">
        {menu.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
              activeTab === item.key
                ? "bg-[#4A9BB5]/10 text-[#4A9BB5] font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}