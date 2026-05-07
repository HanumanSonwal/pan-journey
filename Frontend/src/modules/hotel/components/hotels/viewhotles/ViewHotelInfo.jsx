
import React from "react";

const ViewHotelInfo = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">

      {/* LEFT DESCRIPTION */}
      <p className="col-span-2 text-gray-600 text-sm">
        Enjoy a comfortable stay in our well-designed hotel rooms,
        crafted to offer both relaxation and convenience. Each room
        features modern amenities and cozy interiors.
      </p>

      {/* RIGHT MAP */}
      <div className="rounded-lg overflow-hidden border">
        <iframe
          src="https://www.google.com/maps?q=Candolim,Goa&output=embed"
          className="w-full h-[150px]"
          title="map"
        />
      </div>

    </div>
  );
};

export default ViewHotelInfo;