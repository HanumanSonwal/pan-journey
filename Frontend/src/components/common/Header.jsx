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
import {
  Banknote,
  Bus,
  ChevronRight,
  Gift,
  Headset,
  Hotel,
  Info,
  Plane,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const navigationItems = [
  {
    id: "hotels",
    label: "Hotels",
    subtitle: "Book Hotels",
    href: "/",
    icon: Hotel,
    desktop: true,
    mobile: true,
    type: "link",
  },
  {
    id: "flight",
    label: "Flight Booking",
    subtitle: "Available Soon",
    icon: Plane,
    desktop: true,
    mobile: true,
    type: "comingSoon",
  },
  {
    id: "bus",
    label: "Bus Booking",
    subtitle: "Available Soon",
    icon: Bus,
    desktop: true,
    mobile: true,
    type: "comingSoon",
  },
  {
    id: "offers",
    label: "Best Offers",
    subtitle: "Special Offers",
    href: "/gift-cards",
    icon: Gift,
    desktop: true,
    mobile: true,
    type: "link",
  },
  {
    id: "about",
    label: "About Us",
    subtitle: "Know PAN Journey",
    href: "/about-us",
    icon: Info,
    desktop: true,
    mobile: false, // Drawer me nahi dikhana ho to
    type: "link",
  },
  {
    id: "support",
    label: "Support",
    subtitle: "Contact Us",
    href: "/contact-us",
    icon: Headset,
    desktop: true,
    mobile: true,
    type: "link",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [desktopCurrencyOpen, setDesktopCurrencyOpen] = useState(false);

  const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
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

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(
      (currency) =>
        currency.name.toLowerCase().includes(search.toLowerCase()) ||
        currency.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [currencies, search]);

  const user = session?.user;

  const { requireAuth } = useAuthGuard();

  const getInitials = useCallback((name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };
  const handleLogout = () => {
    logout(session?.refreshToken);
  };

  const drawerItemClass =
    "group flex cursor-pointer items-center justify-between rounded border border-gray-200 bg-white px-2 py-2 shadow-sm transition-all duration-300 hover:border-[#72C0F0] hover:shadow-md";

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

  const navLinkClass =
    "relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full";

  const desktopNavigationItems = navigationItems.filter((item) => item.desktop);

  const mobileNavigationItems = navigationItems.filter((item) => item.mobile);

  const currencyDropdownContent = (
    <div
      className="w-[350px] rounded-xl bg-white p-3 shadow-lg"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="mb-2">
        <Input
          allowClear
          placeholder="Search Currency"
          value={search}
          className="[&_.ant-input]:!border-0 [&_.ant-input]:!shadow-none [&_.ant-input]:focus:!shadow-none"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-3 max-h-87.5 overflow-y-auto">
        {filteredCurrencies.map((currency) => (
          <div
            key={currency.code}
            onClick={() => {
              setCurrency(currency);
              setSearch("");
              if (window.innerWidth < 901) {
                setMobileCurrencyOpen(false);
              } else {
                setDesktopCurrencyOpen(false);
              }
            }}
            className="flex cursor-pointer items-center justify-between rounded-md px-3 py-2 hover:bg-gray-100"
          >
            <span>{currency.name}</span>

            <span className="font-semibold">{currency.code}</span>
          </div>
        ))}
      </div>
    </div>
  );

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
        {/* <nav className="font-roboto! hidden items-center gap-3 text-gray-900 min-[901px]:flex min-[1024px]:gap-4 min-[1200px]:gap-6 min-[1400px]:gap-8">
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
        </nav> */}

        <nav className="font-roboto hidden items-center gap-3 text-gray-900 min-[901px]:flex min-[1024px]:gap-4 min-[1200px]:gap-6 min-[1400px]:gap-8">
          {desktopNavigationItems.map((item) =>
            item.type === "comingSoon" ? (
              <Tooltip key={item.id} title="Coming Soon" color="#0f766e">
                <span className={navLinkClass}>{item.label}</span>
              </Tooltip>
            ) : (
              <Link key={item.id} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ),
          )}
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
            open={desktopCurrencyOpen}
            onOpenChange={setDesktopCurrencyOpen}
            getPopupContainer={(trigger) => trigger.parentElement}
            popupRender={() => currencyDropdownContent}
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
            className="text-xl !text-[#4A9BB5] transition-all duration-300 hover:scale-110 hover:text-gray-800! min-[901px]:hidden"
            onClick={() => setMobileMenu(true)}
          >
            <MenuOutlined />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-3">
            <Image
              src="/images/PJ_LOGO-removebg-preview.png"
              alt="PAN Journey"
              width={48}
              height={48}
            />

            <div>
              <h3 className="text-[18px] font-bold text-[#0F6A75]">
                PAN Journey
              </h3>

              <p className="text-xs text-gray-500">Explore • Book • Travel</p>
            </div>
          </div>
        }
        placement="right"
        size={320}
        open={mobileMenu}
        onClose={closeMobileMenu}
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-2">
            {mobileNavigationItems.map((item) => {
              const Icon = item.icon;

              const content = (
                <div className={drawerItemClass}>
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5FBFE]">
                      <Icon size={20} className="text-[#0F6A75]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="mb-1! text-[15px] font-semibold text-gray-900">
                        {item.label}
                      </p>

                      <p className="mb-0! text-xs text-gray-500">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Side */}
                    {item.type === "comingSoon" ? (
                      <span className="rounded-full bg-[#EAF7FB] px-3 py-1 text-[11px] font-medium text-[#0F6A75]">
                        Soon
                      </span>
                    ) : (
                      <ChevronRight
                        size={20}
                        className="text-[#0F6A75] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </div>
                </div>
              );

              return item.type === "comingSoon" ? (
                <Tooltip key={item.id} title="Coming Soon" color="#0F6A75">
                  {content}
                </Tooltip>
              ) : (
                <Link key={item.id} href={item.href} onClick={closeMobileMenu}>
                  {content}
                </Link>
              );
            })}

            {/* Currency */}
            <Dropdown
              trigger={["click"]}
              open={mobileCurrencyOpen}
              onOpenChange={setMobileCurrencyOpen}
              getPopupContainer={(trigger) => trigger.parentElement}
              popupRender={() => currencyDropdownContent}
            >
              <div className={drawerItemClass}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5FBFE]">
                    <Banknote size={20} className="text-[#0F6A75]" />
                  </div>

                  <div className="flex-1">
                    <p className="mb-1! text-[15px] font-semibold text-gray-900">
                      Currency
                    </p>

                    <p className="mb-0! text-xs text-gray-500">
                      {selectedCurrency?.code}
                    </p>
                  </div>

                  <ChevronRight
                    size={20}
                    className={`text-[#0F6A75] transition-transform duration-300 ${
                      mobileCurrencyOpen ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
            </Dropdown>
          </div>

          {/* Footer */}
          <div className="mt-3! border-t border-gray-200 pt-6">
            <div className="rounded-2xl bg-[#F5FBFE] p-4">
              <h4 className="text-[15px] font-semibold text-[#0F6A75]">
                PAN Journey
              </h4>

              <p className="mt-2 text-[13px] leading-6 text-gray-500">
                Discover premium stays, exclusive hotel offers and seamless
                booking experiences across India.
              </p>
            </div>
          </div>
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
