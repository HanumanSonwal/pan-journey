"use client";

import { CameraOutlined } from "@ant-design/icons";
import Image from "next/image";

const ViewHotelGallery = ({ images = [], onOpen }) => {
  const galleryImages = Array.isArray(images) ? images : [];

  const getHDImage = (url) => {
    if (!url) {
      return "https://placehold.co/1000x700?text=Hotel";
    }

    return url.replace("_t.", "_y.").replace("_b.", "_y.");
  };

  const imageUrls = galleryImages
    .map((item) => getHDImage(item?.ImageURL || item?.image || item))
    .filter(Boolean);

  const totalPhotos = imageUrls.length;

  const getImage = (index) => {
    return imageUrls[index] || imageUrls[0] || "https://placehold.co/1000x700?text=Hotel";
  };

  return (
    <div className="grid h-[360px] w-full grid-cols-[1.35fr_1.65fr] gap-2 overflow-hidden rounded-xl">
      <div onClick={onOpen} className="relative h-full cursor-pointer overflow-hidden rounded-l-xl">
        <Image src={getImage(0)} alt="Hotel main image" fill priority sizes="42vw" className="object-cover transition-transform duration-500 hover:scale-105" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      </div>

      <div className="grid h-full grid-cols-2 grid-rows-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => {
          const imageIndex = index + 1;
          const isLast = index === 3;

          return (
            <div key={imageIndex} onClick={onOpen} className="relative cursor-pointer overflow-hidden">
              <Image src={getImage(imageIndex)} alt={`Hotel gallery ${imageIndex + 1}`} fill sizes="25vw" className="object-cover transition-transform duration-500 hover:scale-105" />

              {isLast && totalPhotos > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <div className="rounded-lg bg-black/55 px-5 py-3 text-center text-white backdrop-blur-sm">
                    <p className="text-2xl font-bold">{totalPhotos}</p>
                    <p className="text-xs font-medium">Photos</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewHotelGallery;
