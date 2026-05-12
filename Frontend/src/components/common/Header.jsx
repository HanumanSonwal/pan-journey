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
import LoginSuccessModal from "./LoginSuccessModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const router = useRouter();

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
          <span className="font-medium text-sm">
            {user?.name || "User"}
          </span>
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
          className="text-red-500 flex items-center gap-1"
        >
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-offer-gradient text-white text-center py-2 text-sm md:text-base">
        Get the best offers on your every booking!
      </div>

      {/* Navbar */}
      <header className="bg-white px-4 md:px-10 lg:px-20 py-4 flex items-center justify-between shadow-sm">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl lg:text-4xl font-bold bg-offer-gradient bg-clip-text text-transparent"
        >
          LOGO
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-gray-900">
          <Link href="#">Hotels</Link>
          <Link href="#">Best Offers</Link>
          <Link href="#">Flight Booking</Link>
          <Link href="#">Bus Booking</Link>
          <Link href="#">Support</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Wishlist */}
          <button className="hidden md:flex items-center gap-2 border border-[#4A9BB5] !text-[#4A9BB5] px-3 py-2 rounded-lg text-sm font-medium">
            <HeartOutlined />
            Wishlist
          </button>

          {!session ? (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-offer-gradient text-white px-3 py-2 rounded-lg text-sm"
            >
              <UserOutlined />
              <span className="hidden md:block">Login</span>
            </button>
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer">

                {/* ✅ PERFECT ROUND AVATAR */}
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#4A9BB5] flex items-center justify-center bg-gray-100">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
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
            className="lg:hidden text-xl !text-[#4A9BB5]"
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

      <LoginSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onProfile={() => {
          setShowSuccess(false);
          router.push("/profile");
        }}
      />
    </div>
  );
}
