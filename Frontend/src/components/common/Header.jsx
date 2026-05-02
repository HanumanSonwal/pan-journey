"use client";

import LoginModal from "@/modules/auth/components/LoginFormModal";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      // 🔥 call backend logout
      await fetch("http://localhost:8000/api/v1/customer/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: session?.refreshToken,
        }),
      });
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      // 🔥 clear nextauth session
      await signOut({ callbackUrl: "/" });
    }
  };

  const items = [
    {
      key: "profile",
      label: <Link href="/profile">My Profile</Link>,
    },
    {
      key: "booking",
      label: <Link href="/booking">My Bookings</Link>,
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Logout</span>,
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
            // ✅ LOGGED IN
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="cursor-pointer flex items-center gap-2">
                <Avatar src={session.user.image} icon={<UserOutlined />} />
                <span className="hidden md:block">
                  {session.user.name || "User"}
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
