"use client";

import LoginModal from "@/modules/auth/components/LoginFormModal";
import { useLogout } from "@/modules/auth/hooks/useAuth";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { useCurrency } from "@/modules/shared/home/hooks/useCurrency";
import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import {
  DownOutlined,
  HeartOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Dropdown, Input, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: currencies = [] } = useCurrency();
  const { data: session } = useSession();
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const { selectedCurrency, setCurrency } = useCurrencyStore();
  const [search, setSearch] = useState("");
  const { data: wishlistIdsData } = useWishlistIds();
  const wishlistCount = wishlistIdsData?.length || 0;
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(search.toLowerCase()) ||
      currency.code.toLowerCase().includes(search.toLowerCase()),
  );
  console.log("Selected Currency:", selectedCurrency);
  const user = session?.user;
  const { requireAuth } = useAuthGuard();
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
const closeMobileMenu = () => {
  setMobileMenu(false);
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
    {
      key: "booking",
      label: <Link href="/profile?tab=BookingHistory">My Bookings</Link>,
    },
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

  const currencyItems = currencies.map((currency) => ({
    key: currency.code,
    label: (
      <div className="flex items-center gap-3">
        <span className="font-medium">{currency.symbol}</span>
        <div className="flex flex-col">
          <span className="font-medium">{currency.code}</span>

          <span className="text-xs text-gray-500">{currency.name}</span>
        </div>
      </div>
    ),
    onClick: () => setCurrency(currency),
  }));

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-offer-gradient py-2 text-center text-sm text-white md:text-base">
        Get the best offers on your every booking!
      </div>

      {/* Navbar */}
      <header className="flex h-18 justify-between bg-white px-4 py-1 !pt-0 shadow-sm md:px-10 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/PJ_LOGO-removebg-preview.png"
            alt="PAN Journey"
            width={120}
            height={110}
            priority
            unoptimized
            className="absolute top-8 left-2 h-[100px] w-[100px] object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="font-roboto! hidden min-[901px]:flex items-center text-gray-900 gap-3 min-[1024px]:gap-4 min-[1200px]:gap-6 min-[1400px]:gap-8">
          <Link
            href="/"
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
          >
            Hotels
          </Link>

          <Tooltip title="Coming Soon" color="#0f766e">
            <span className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full">
              Flight Booking
            </span>
          </Tooltip>

          <Tooltip title="Coming Soon" color="#0f766e">
            <span className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full">
              Bus Booking
            </span>
          </Tooltip>

          <Link
            href="/gift-cards"
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
          >
            Best Offers
          </Link>
          <Link
            href="/about-us"
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
          >
            About Us
          </Link>
          <Link
            href="/contact-us"
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
          >
            Support
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Wishlist */}
          <button
            onClick={() =>
              requireAuth(() => {
                router.push("/profile?tab=wishlist");
              })
            }
            className="group hidden cursor-pointer items-center gap-2 rounded-lg border border-[#4A9BB5] px-3 py-2 text-sm font-medium text-[#4A9BB5]! transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A9BB5] hover:text-white! md:flex"
          >
            {wishlistCount > 0 && (
              <span className="ml-1 rounded-full bg-[#4A9BB5] px-2 py-0.5 text-xs font-semibold text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#4A9BB5]">
                {wishlistCount}
              </span>
            )}
            <HeartOutlined />
            Wishlist
          </button>
          <Dropdown
            trigger={["click"]}
            open={currencyDropdownOpen}
            onOpenChange={setCurrencyDropdownOpen}
            popupRender={() => (
              <div className="w-[350px] rounded-xl bg-white p-3 shadow-lg">
                <div className="mb-2">
                  <Input
                    allowClear
                    placeholder="Search Currency"
                    value={search}
                    className="[&_.ant-input]:!border-0 [&_.ant-input]:!shadow-none [&_.ant-input]:focus:!shadow-none"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="mt-3 max-h-87.5 overflow-y-auto">
                  {filteredCurrencies.map((currency) => (
                    <div
                      key={currency.code}
                      onClick={() => {
                        setCurrency(currency);
                        setCurrencyDropdownOpen(false);
                        setSearch("");
                      }}
                      className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100"
                    >
                      <span>{currency.name}</span>
                      <span className="font-semibold">{currency.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          >
            <button className="hidden items-center gap-2 rounded-lg border border-[#4A9BB5] px-3 py-2 text-sm font-medium text-[#4A9BB5]! transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A9BB5] hover:text-white! md:flex">
              <span>{selectedCurrency?.symbol}</span>
              <span className="max-w-20 truncate">
                {selectedCurrency?.code}
              </span>
              <DownOutlined />
            </button>
          </Dropdown>

          {!session ? (
            <button
              onClick={() => setOpen(true)}
              className="bg-offer-gradient flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <UserOutlined />
              <span className="hidden md:block">Login</span>
            </button>
          ) : (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex cursor-pointer items-center gap-2 transition-all duration-300 hover:scale-105">
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
            className="text-xl !text-[#4A9BB5] min-[901px]:hidden transition-all duration-300 hover:scale-110 hover:text-gray-800!"
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
        <div className="flex flex-col gap-5 text-[16px] font-medium">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="relative w-fit !text-black transition-colors duration-200 hover:!text-[#0f766e] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:after:w-full"
          >
            Hotels
          </Link>

          <Link
            href="/gift-cards"
            onClick={closeMobileMenu}
            className="relative w-fit !text-black transition-colors duration-200 hover:!text-[#0f766e] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:after:w-full"
          >
            Best Offers
          </Link>
          <Tooltip title="Coming Soon" color="#0f766e">
            <span className="relative w-fit cursor-pointer transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full">
              Flights
            </span>
          </Tooltip>
          <Tooltip title="Coming Soon" color="#0f766e">
            <span className="relative w-fit cursor-pointer transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full">
              Bus
            </span>
          </Tooltip>

          <Link
            href="/contact-us"
            onClick={closeMobileMenu}
            className="relative w-fit !text-black transition-colors duration-200 hover:!text-[#0f766e] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:after:w-full"
          >
            Support
          </Link>
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
