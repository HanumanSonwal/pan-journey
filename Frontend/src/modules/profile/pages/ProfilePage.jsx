"use client";

import { useState } from "react";

import BookingDetailsTab from "../components/BookingDetailsTab";
import BookingHistoryTab from "../components/BookingHistoryTab";
import DocumentsTab from "../components/DocumentsTab";
import HelpSupportPage from "../components/HelpSupportPage";

import ProfileOverview from "../components/ ProfileOverview";
import Sidebar from "../components/Sidebar";
import WishlistTab from "../components/WishlistTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // 🔹 common handler (duplicate code hata diya)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#edf7ff] overflow-x-hidden">

      {/* 🔷 TOP BANNER */}
      <div className="relative h-[180px] sm:h-[200px] md:h-[220px] w-full overflow-hidden">
        <img
          src="/images/profile-bg.png"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 🔷 MAIN SECTION */}
      <div
        className="relative mx-auto mt-8 sm:-mt-10 md:-mt-12 max-w-[1300px] px-3 sm:px-4 md:px-5 lg:px-6 pb-10 md:pb-12
      "
      >

        {/* 🔥 TABLET HORIZONTAL SIDEBAR */}
        <div className="hidden md:block lg:hidden mb-5 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              horizontal   // 👈 tablet mode
            />
          </div>
        </div>

        {/* 🔷 GRID */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-4 md:gap-5 lg:gap-6
        "
        >

          {/* 🔷 SIDEBAR (desktop only) */}
          <div className="hidden lg:block w-full sticky top-5 self-start">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
            />
          </div>

          {/* 🔷 CONTENT */}
          <div className="min-w-0">

            {activeTab === "profile" && <ProfileOverview />}

            {activeTab === "documents" && <DocumentsTab />}

            {activeTab === "wishlist" && <WishlistTab />}

            {activeTab === "BookingHistory" && (
              <>
                {!selectedBooking ? (
                  <BookingHistoryTab setSelectedBooking={setSelectedBooking} />
                ) : (
                  <BookingDetailsTab
                    booking={selectedBooking}
                    onBack={() => setSelectedBooking(null)}
                  />
                )}
              </>
            )}

            {activeTab === "settings" && (
              <div className="rounded-2xl bg-white p-4 sm:p-5 md:p-6 shadow-[1px_4px_4px_4px_#00000014]">
                <p className="text-sm sm:text-base text-gray-700">
                  Settings coming soon...
                </p>
              </div>
            )}

            {activeTab === "support" && <HelpSupportPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
