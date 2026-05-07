"use client";

import { Card } from "antd";
import { useState } from "react";

import ViewHotelGallery from "../components/hotels/viewhotles/ViewHotelGallery";
import ViewHotelInfo from "../components/hotels/viewhotles/ViewHotelInfo";
import ViewHotelModal from "../components/hotels/viewhotles/ViewHotelModal";
import ViewHotelPriceCard from "../components/hotels/viewhotles/ViewHotelPriceCard";
import ViewHotelTabs from "../components/hotels/viewhotles/ViewHotelTabs";

import HotelSectionsContent from "../components/hotels/viewhotles/HotelSectionsContent";
import HotelSectionsTabs from "../components/hotels/viewhotles/HotelSectionsTabs";

const HotelDetails = () => {
  const [activeTab, setActiveTab] = useState("Room Options");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-center bg-[#eaf3f9] px-2 sm:px-4 md:px-6">

      <div className="w-full max-w-7xl">

        <div className="bg-[#eaf3f9] py-6">
          <Card className="rounded-xl shadow-lg">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <ViewHotelGallery onOpen={() => setOpen(true)} />
              <ViewHotelPriceCard />
            </div>

            <ViewHotelTabs />

            <ViewHotelInfo />

          </Card>

          <ViewHotelModal open={open} onClose={() => setOpen(false)} />
        </div>

        <div className="mt-6">
          <HotelSectionsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="mt-4">
          <HotelSectionsContent activeTab={activeTab} />
        </div>

      </div>
    </div>
  );
};

export default HotelDetails;
