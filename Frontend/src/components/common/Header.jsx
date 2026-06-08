"use client";

import LoginModal from "@/modules/auth/components/LoginFormModal";
import { useLogout } from "@/modules/auth/hooks/useAuth";
import {
  HeartOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Dropdown } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const router = useRouter();

  console.log("SESSION:", session);

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
          <span className="text-sm font-medium">{user?.name || "User"}</span>
          <span className="text-xs text-gray-400">
            {user?.email || user?.mobile || ""}
          </span>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    { key: "profile", label: <Link href="/profile">My Profile</Link> },
    { key: "booking", label: <Link href="/booking">My Bookings</Link> },
    { type: "divider" },
    {
      key: "logout",
      label: (
        <span
          onClick={handleLogout}
          className="flex items-center gap-1 text-red-500"
        >
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-offer-gradient py-2 text-center text-sm text-white md:text-base">
        Get the best offers on your every booking!
      </div>

      {/* Navbar */}
      <header className="flex h-18 justify-between bg-white px-4 py-1 shadow-sm md:px-10 lg:px-20 !pt-0 ">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/PJ_LOGO-removebg-preview.png"
            alt="PAN Journey"
            width={120}
            height={110}
            priority
            unoptimized
            className="absolute top-8 left-2 w-[100px] h-[100px] object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 text-gray-900 lg:flex">
          <Link href="#">Hotels</Link>
          <Link href="#">Best Offers</Link>
          <Link href="#">Flight Booking</Link>
          <Link href="#">Bus Booking</Link>
          <Link href="#">Support</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Wishlist */}
          <button className="hidden items-center gap-2 rounded-lg border border-[#4A9BB5] px-3 py-2 text-sm font-medium !text-[#4A9BB5] md:flex">
            <HeartOutlined />
            Wishlist
          </button>

          {!session ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-offer-gradient flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white"
            >
              <UserOutlined />
              <span className="hidden md:block">Login</span>
            </button>
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex cursor-pointer items-center gap-2">
                {/* ✅ PERFECT ROUND AVATAR */}
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[#4A9BB5] bg-gray-100">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-[#4A9BB5]">
                      {getInitials(user?.name)}
                    </span>
                  )}
                </div>
              </div>
            </Dropdown>
          )}

          {/* Mobile Menu */}
          <button
            className="text-xl !text-[#4A9BB5] lg:hidden"
            onClick={() => setMobileMenu(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenu(false)}
        open={mobileMenu}
      >
        <div className="flex flex-col gap-4">
          <Link href="#">Hotels</Link>
          <Link href="#">Best Offers</Link>
          <Link href="#">Flights</Link>
          <Link href="#">Bus</Link>
          <Link href="#">Support</Link>
        </div>
      </Drawer>

      {/* Modals */}
      <LoginModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          setShowSuccess(true);
        }}
      />
    </div>
  );
}
