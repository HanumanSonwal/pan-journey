"use client";

import {
  AccountBookOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useLogout } from "@/modules/auth/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Sidebar({ activeTab, setActiveTab }) {
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const [logoutModal, setLogoutModal] = useState(false);
  const user = session?.user;

  const handleLogout = () => {
    logout(session?.refreshToken);
  };
  // 🔹 MENU
  const topMenu = [
    {
      key: "profile",
      label: "My Profile",
      icon: <UserOutlined />,
    },

    {
      key: "documents",
      label: "Documents",
      icon: <FileTextOutlined />,
    },

    {
      key: "wishlist",
      label: "Wishlist",
      icon: <HeartOutlined />,
    },

    {
      key: "BookingHistory",
      label: "Booking History",
      icon: <AccountBookOutlined />,
    },

    {
      key: "support",
      label: "Help & Support",
      icon: <CustomerServiceOutlined />,
    },

    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  // 🔹 USER INITIALS
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="max-h-screen w-[320px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {/* 🔹 PROFILE HEADER */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          {/* AVATAR */}
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#4A9BB5] text-xl font-bold text-white">
            {user?.image ? (
              <img
                src={user.image}
                alt="avatar"
                className="h-full w-full object-cover"
                width="100%"
                height="100%"
              />
            ) : (
              getInitials(user?.name)
            )}
          </div>

          {/* USER INFO */}
          <div className="min-w-0 flex-1">
            <p className="mb-1! truncate text-[22px] font-semibold text-gray-700">
              {user?.name || "User"}
            </p>

            <p className="text-[14px] font-medium text-gray-500">My Account</p>
          </div>
        </div>

        {/* 🔹 MENU */}
        <div className=" flex flex-col gap-3">
          {topMenu.map((item) => {
            const isActive = activeTab === item.key;

            return (
              <div
                key={item.key}
                onClick={() => {
                  if (item.key === "logout") {
                    setLogoutModal(true);
                    return;
                  }

                  setActiveTab(item.key);
                }}
                className={`flex cursor-pointer items-center justify-between rounded border px-5  py-4 transition-all duration-200 ${
                  isActive
                    ? "border-[#4A9BB5] bg-[#4A9BB5]/10"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                {/* LEFT */}
                <div
                  className={`flex items-center gap-4 ${
                    isActive ? "text-[#4A9BB5]" : "text-black"
                  }`}
                >
                  <span className="text-[19px]">{item.icon}</span>

                  <span className="text-[15px] font-medium">{item.label}</span>
                </div>

                {/* RIGHT ARROW */}
                <span
                  className={`text-[16px] transition-all ${
                    isActive ? "text-[#4A9BB5]" : "text-gray-400"
                  }`}
                >
                  →
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔹 LOGOUT MODAL */}
      <LogoutModal
        open={logoutModal}
        onCancel={() => setLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
