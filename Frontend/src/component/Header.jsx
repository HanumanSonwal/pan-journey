"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full">

      {/* 🔹 Top Offer Bar (Gradient) */}
      <div className="bg-gradient-to-r from-[#6FAED0] via-[#4A9BB5] to-[#1F6F78] text-white text-center py-2 text-sm">
        Get the best offers on your every booking!
      </div>

      {/* 🔹 Main Navbar */}
      <header className="bg-white px-8 py-4 flex items-center justify-between shadow-sm">

        {/* Logo */}
        <div className="text-4xl font-bold bg-gradient-to-r from-[#6FAED0] to-[#1F6F78] bg-clip-text text-transparent tracking-widest">
          LOGO
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="#" className="hover:text-[#4A9BB5]">Hotels</Link>
          <Link href="#" className="hover:text-[#4A9BB5]">Best Offers</Link>
          <Link href="#" className="hover:text-[#4A9BB5]">Flight Booking</Link>
          <Link href="#" className="hover:text-[#4A9BB5]">Bus Booking</Link>
          <Link href="#" className="hover:text-[#4A9BB5]">Support</Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <button className="flex items-center gap-2 border-3 border-[#4A9BB5] text-sm px-4 py-2 rounded-lg text-[#4A9BB5] hover:bg-gradient-to-r hover:from-[#6FAED0]/20 hover:to-[#1F6F78]/20 transition">
            
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#4A9BB5"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.81-4 2.09-.73-1.28-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 7.5 9 11.25 9 11.25s9-3.75 9-11.25z"
              />
            </svg>

           <span className="text-[#4A9BB5]"> Wishlist</span>
          </button>

          {/* Login Button (Gradient) */}
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#6FAED0] to-[#1F6F78] text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition">
            
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
              />
            </svg>

            Login / Sign Up
          </button>

        </div>

      </header>
    </div>
  );
}