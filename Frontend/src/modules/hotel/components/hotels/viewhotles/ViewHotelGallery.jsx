import React from "react";

const ViewHotelGallery = ({ onOpen }) => {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-3">

      {/* 🔥 LEFT SIDE BIG IMAGE */}
      <div>
        <img
          src="https://images.unsplash.com/photo-1566073771259"
          className="rounded-lg h-full w-full object-cover"
        />
      </div>

      {/* 🔥 RIGHT SIDE (2 ROWS) */}
      <div className="flex flex-col gap-3">

        {/* 👉 TOP SMALL IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1582719478250"
          className="rounded-lg h-[130px] object-cover"
        />

        {/* 👉 BOTTOM IMAGE + OVERLAY */}
        <div
          className="relative cursor-pointer"
          onClick={onOpen}
        >
          <img
            src="https://images.unsplash.com/photo-1571896349842"
            className="rounded-lg h-[130px] object-cover w-full"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-center">
            3000+ Photos
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewHotelGallery;