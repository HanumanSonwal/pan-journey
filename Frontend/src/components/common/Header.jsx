"use client";

import LoginModal from "@/modules/auth/components/LoginFormModal";
import { useLogout } from "@/modules/auth/hooks/useAuth";
import { HeartOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();

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

 const handleLogout = () => {
  logout(session?.refreshToken);
};

  const items = [
    {
      key: "user",
      label: (
        <div className="flex flex-col">
          <span className="font-medium text-[14px]">
            {user?.name || "User"}
          </span>
          <span className="text-[12px] text-gray-400">
            {user?.email || user?.mobile || ""}
          </span>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: <Link href="/profile">My Profile</Link>,
    },
    {
      key: "booking",
      label: <Link href="/booking">My Bookings</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <span
          onClick={handleLogout}
          className="text-red-500 flex items-center gap-1"
        >
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* 🔹 Top Offer Bar */}
      <div className="bg-offer-gradient text-white text-center py-3 text-[16px] leading-[120%]">
        Get the best offers on your every booking!
      </div>

      {/* 🔹 Navbar */}
      <header className="bg-white px-10 md:px-30 py-4 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="text-3xl md:text-4xl font-bold bg-offer-gradient bg-clip-text text-transparent tracking-widest">
          LOGO
        </div>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-gray-900 text-[16px] leading-[130%]">
          <Link href="#" className="hover:text-[#4A9BB5]">
            Hotels
          </Link>
          <Link href="#" className="hover:text-[#4A9BB5]">
            Best Offers
          </Link>
          <Link href="#" className="hover:text-[#4A9BB5]">
            Flight Booking
          </Link>
          <Link href="#" className="hover:text-[#4A9BB5]">
            Bus Booking
          </Link>
          <Link href="#" className="hover:text-[#4A9BB5]">
            Support
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button className="flex items-center gap-2 border border-[#4A9BB5] text-[#4A9BB5] px-4 py-2 rounded-lg text-[16px] leading-[130%] font-medium hover:bg-[#4A9BB5]/10 transition">
            <HeartOutlined style={{ color: "#4A9BB5", fontSize: 16 }} />
            <span className="text-[#4A9BB5]">Wishlist</span>
          </button>

          {!session ? (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-offer-gradient text-white px-4 py-2 rounded-lg text-[16px] leading-[130%] hover:opacity-90 transition"
            >
              <UserOutlined style={{ fontSize: 16 }} />
              Login / Sign Up
            </button>
          ) : (
            // ✅ USER PROFILE (same style improved)
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 transition">
                {/* 🔥 Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#4A9BB5] flex items-center justify-center text-white text-sm font-semibold border border-gray-200">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name)
                  )}
                </div>

                <span className="hidden md:block text-gray-900 font-medium text-[14px] leading-tight">
                  {user?.name || "User"}
                </span>
              </div>
            </Dropdown>
          )}
        </div>
      </header>

      <LoginModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
