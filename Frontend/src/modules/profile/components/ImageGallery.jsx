"use client";

import { Modal } from "antd";
import { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const [open, setOpen] = useState(false);

  const mainImage = images?.[0];
  const smallImages = images?.slice(1, 4) || [];

  return (
    <>
      {/* FIXED WIDTH WRAPPER (IMPORTANT) */}
      <div className="w-full md:w-[280px] shrink-0">
        {/* MAIN IMAGE */}
        <div
          className="w-full h-[180px] rounded-t-xl overflow-hidden cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img
            src={mainImage}
            alt="hotel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* SMALL IMAGES */}
        <div className="grid grid-cols-4 gap-2 mt-2 px-1 pb-2">
          {smallImages.map((img, i) => {
            const isLast = i === 2 && images.length > 4;

            return (
              <div
                key={i}
                className="relative w-full h-[60px] rounded-md overflow-hidden cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />

                {/* VIEW ALL */}
                {isLast && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[11px] font-medium">
                    +{images.length - 3} View All
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="85%"
        centered
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="w-full h-[200px]">
              <img
                src={img}
                alt="gallery"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
