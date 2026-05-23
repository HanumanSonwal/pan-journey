"use client";

import AboutHotel from "./HotelSections/AboutHotel";
import Amenities from "./HotelSections/Amenities";
import FeesRules from "./HotelSections/FeesRules";
import LocationSection from "./HotelSections/LocationSection";
import Policies from "./HotelSections/Policies";
import RoomOptions from "./HotelSections/RoomOptions";

const HotelSectionsContent = ({
  supplierData = {},
  ratePlans = [],
  amenities = [],
}) => {
  return (
    <div className="space-y-6">
      {/* Rooms */}
      <section id="rooms-section" className="scroll-mt-36">
        <RoomOptions ratePlans={ratePlans} />
      </section>

      {/* Amenities */}
      <section id="amenities-section" className="scroll-mt-36">
        <Amenities amenities={amenities} />
      </section>

      {/* Policies */}
      <section id="policies-section" className="scroll-mt-36">
        <Policies ratePlans={ratePlans} />
      </section>

      {/* Fees */}
      <section id="fees-section" className="scroll-mt-36">
        <FeesRules ratePlans={ratePlans} />
      </section>

      {/* Location */}
      <section id="location-section" className="scroll-mt-36">
        <LocationSection supplierData={supplierData} />
      </section>

      {/* About */}
      <section id="about-section" className="scroll-mt-36">
        <AboutHotel about={supplierData?.AboutHotel} />
      </section>
    </div>
  );
};

export default HotelSectionsContent;
