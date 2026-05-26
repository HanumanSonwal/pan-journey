"use client";

import Image from "next/image";

const ViewHotelGallery = ({ images = [], onOpen }) => {
  const galleryImages = images || [];

  const getHDImage = (url) => {
    if (!url) return "https://placehold.co/1000x700?text=Hotel";
    return url.replace("_t.", "_y.").replace("_b.", "_y.");
  };
  const mainImage = getHDImage(galleryImages?.[0]?.ImageURL);
  const topRightImage = getHDImage(
    galleryImages?.[1]?.ImageURL || galleryImages?.[0]?.ImageURL,
  );
  const bottomRightImage = getHDImage(
    galleryImages?.[2]?.ImageURL || galleryImages?.[0]?.ImageURL,
  );
  const totalPhotos = galleryImages?.length || 0;
  return (
    <div className="grid h-full grid-cols-1 gap-3 md:grid-cols-2">
      <div
        onClick={onOpen}
        className="relative cursor-pointer overflow-hidden rounded
        h-[260px]
sm:h-[320px]
md:h-[420px]
lg:h-[520px]
xl:h-full
2xl:h-full"
      >
        <Image
          src={mainImage}
          alt="hotel-main"
          fill
          priority
          sizes="(max-width:768px) 100vw, 60vw"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      <div className="flex h-full flex-col gap-3">
        <div
          onClick={onOpen}
          className="relative flex-1 cursor-pointer overflow-hidden rounded"
        >
          <Image
            src={topRightImage}
            alt="hotel-gallery-top"
            fill
            sizes="30vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div
          onClick={onOpen}
          className="relative flex-1 cursor-pointer overflow-hidden rounded"
        >
          <Image
            src={bottomRightImage}
            alt="hotel-gallery-more"
            fill
            sizes="30vw"
            className="object-cover transition duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <div className="rounded bg-black/35 px-5 py-4 text-center text-white backdrop-blur-md">
              <p className="text-2xl font-semibold">{totalPhotos}+</p>
              <p className="text-sm opacity-90">Photos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHotelGallery;
