"use client";

import { useState } from "react";

import ProfileOverview from "../components/ ProfileOverview";
import BookingDetailsTab from "../components/BookingDetailsTab";
import BookingHistoryTab from "../components/BookingHistoryTab";
import DocumentsTab from "../components/DocumentsTab";
import HelpSupportPage from "../components/HelpSupportPage";
import Sidebar from "../components/Sidebar";
import WishlistTab from "../components/WishlistTab";
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="min-h-screen bg-[#edf7ff]">
      {/* TOP BANNER */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src="/images/profile-bg.png"
          alt="background"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* MAIN SECTION */}
      <div className="relative z-20 mx-auto -mt-10 max-w-[1300px] px-4 pb-12 sm:px-5 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <div className="sticky top-5 self-start">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);

                // RESET BOOKING DETAILS
                setSelectedBooking(null);
              }}
            />
          </div>

          {/* CONTENT */}
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
              <div className="rounded-2xl bg-white p-6 shadow-[1px_4px_4px_4px_#00000014]">
                <p className="mb-0 text-[16px] text-gray-700">
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
