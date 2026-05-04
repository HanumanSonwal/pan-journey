"use client";

import { useState } from "react";
import ProfileOverview from "../components/ ProfileOverview";
import Sidebar from "../components/Sidebar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-[#edf7ff] min-h-screen">
      <div className="relative h-[240px] w-full">
        <img
          src="/images/profile-bg.png" 
          alt="background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 🔹 MAIN CONTENT (OVERLAP CARD) */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-10 -mt-10 pb-10">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeTab === "profile" && <ProfileOverview />}

              {activeTab === "bookings" && <div>Bookings coming soon...</div>}
              {activeTab === "wishlist" && <div>Wishlist coming soon...</div>}
              {activeTab === "settings" && <div>Settings coming soon...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
