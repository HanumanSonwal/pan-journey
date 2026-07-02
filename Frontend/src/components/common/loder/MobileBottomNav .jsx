"use client";

import { BriefcaseBusiness, Gift, Heart, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "My Trips",
    href: "/profile?tab=BookingHistory",
    icon: BriefcaseBusiness,
  },
  {
    name: "Wishlist",
    href: "/profile?tab=wishlist",
    icon: Heart,
  },
  {
    name: "Gift Card",
    href: "/gift-cards",
    icon: Gift,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 w-full border-t border-gray-200 bg-white shadow-lg md:hidden">
      <div className="grid grid-cols-4">
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              scroll={true}
              className={`group flex flex-col items-center justify-center py-2 transition-all duration-300 ${active ? "text-[#72C0F0]" : "text-gray-700"
                } hover:text-[#72C0F0]`}
            >
              <Icon
                size={22}
                strokeWidth={2}
                fill={active ? "currentColor" : "none"}
                className={`transition-all duration-300 ${active
                  ? "text-[#72C0F0]"
                  : "text-gray-700 group-hover:text-[#72C0F0]"
                  } group-hover:fill-current`}
              />

              <span
                className={`mt-1 font-roboto text-[12px] font-medium transition-colors duration-300 ${active
                  ? "text-[#72C0F0]"
                  : "text-gray-700 group-hover:text-[#72C0F0]"
                  }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}