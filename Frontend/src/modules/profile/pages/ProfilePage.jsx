"use client";

import { useState } from "react";

import ProfileOverview from "../components/ ProfileOverview";
import BookingHistoryTab from "../components/BookingHistoryTab";
import DocumentsTab from "../components/DocumentsTab";
import Sidebar from "../components/Sidebar";
import WishlistTab from "../components/WishlistTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-[#edf7ff] min-h-screen">
      {/* TOP BANNER */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src="/images/profile-bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* MAIN SECTION */}
      <div className="relative z-20 max-w-[1250px] mx-auto px-3 sm:px-4 md:px-6 -mt-14 pb-10">
        {/* SMALL GAP */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-3 items-start">
          {/* SIDEBAR */}
          <div className="w-full sticky top-5 self-start">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 bg-white  border border-gray-200 shadow-[1px_4px_4px_4px_#00000014] overflow-hidden">
            {activeTab === "profile" && <ProfileOverview />}

            {activeTab === "documents" && <DocumentsTab />}

            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "BookingHistory" && <BookingHistoryTab />}

            {activeTab === "settings" && (
              <div className="p-6">Settings coming soon...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
