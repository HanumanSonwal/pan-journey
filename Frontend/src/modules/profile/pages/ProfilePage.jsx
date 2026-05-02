"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileOverview from "../components/ ProfileOverview";


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-20 py-8">
      <div className="flex gap-6">
        {/* 🔹 Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 🔹 Content */}
        <div className="flex-1">
          {activeTab === "profile" && <ProfileOverview />}

          {activeTab === "bookings" && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              Bookings coming soon...
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              Wishlist coming soon...
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              Settings coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}