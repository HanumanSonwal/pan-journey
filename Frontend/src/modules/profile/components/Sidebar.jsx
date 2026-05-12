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

export default function Sidebar({ activeTab, setActiveTab, horizontal }) {
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const [logoutModal, setLogoutModal] = useState(false);
  const user = session?.user;

  const handleLogout = () => {
    logout(session?.refreshToken);
  };

  const topMenu = [
    { key: "profile", label: "My Profile", icon: <UserOutlined /> },
    { key: "documents", label: "Documents", icon: <FileTextOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "BookingHistory", label: "Booking History", icon: <AccountBookOutlined /> },
    { key: "support", label: "Help & Support", icon: <CustomerServiceOutlined /> },
    { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
  ];

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
      <div
        className={
          horizontal
            ? "w-full p-3 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 overflow-x-auto"
            : "w-[320px] p-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        }
      >
        {/* 🔹 DESKTOP PROFILE HEADER */}
        {!horizontal && (
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#4A9BB5] text-xl font-bold text-white">
              {user?.image ? (
                <img src={user.image} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                getInitials(user?.name)
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[22px] font-semibold text-gray-700">
                {user?.name || "User"}
              </p>
              <p className="text-[14px] text-gray-500">My Account</p>
            </div>
          </div>
        )}

        {/* 🔹 MENU */}
        <div className={horizontal ? "flex gap-3 min-w-max" : "flex flex-col gap-3"}>
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
                className={`
                  flex cursor-pointer items-center justify-between rounded border
                  ${horizontal ? "px-4 py-2 whitespace-nowrap" : "px-5 py-4"}
                  transition-all duration-200
                  ${isActive
                    ? "border-[#4A9BB5] bg-[#4A9BB5]/10"
                    : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {/* LEFT */}
                <div
                  className={`flex items-center gap-3 ${isActive ? "text-[#4A9BB5]" : "text-black"
                    }`}
                >
                  {/* 🔥 PROFILE ICON → DP (ONLY in tablet) */}
                  {horizontal && item.key === "profile" ? (
                    <div className="h-6 w-6 rounded-full overflow-hidden bg-[#4A9BB5] flex items-center justify-center text-white text-xs">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt="avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(user?.name)
                      )}
                    </div>
                  ) : (
                    <span className="text-[18px]">{item.icon}</span>
                  )}

                  <span className="text-[14px] font-medium">
                    {item.label}
                  </span>
                </div>

                {/* RIGHT ARROW (only desktop) */}
                {!horizontal && (
                  <span
                    className={`${isActive ? "text-[#4A9BB5]" : "text-gray-400"
                      }`}
                  >
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <LogoutModal
        open={logoutModal}
        onCancel={() => setLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
