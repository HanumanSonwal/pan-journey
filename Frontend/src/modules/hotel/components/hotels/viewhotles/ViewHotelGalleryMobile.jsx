"use client";

import Image from "next/image";

const ViewHotelGalleryMobile = ({
  images = [],
  onOpen,
  onBack,
  onWishlist,
  isWishlisted,
}) => {
  const getHDImage = (url) => {
    if (!url) return "https://placehold.co/800x600?text=Hotel";
    return url.replace("_t.", "_y.").replace("_b.", "_y.");
  };

  const gallery = [
    getHDImage(images?.[0]?.ImageURL),
    getHDImage(images?.[1]?.ImageURL || images?.[0]?.ImageURL),
    getHDImage(images?.[2]?.ImageURL || images?.[0]?.ImageURL),
    getHDImage(images?.[3]?.ImageURL || images?.[0]?.ImageURL),
    getHDImage(images?.[4]?.ImageURL || images?.[0]?.ImageURL),
  ];

  const totalPhotos = images.length;

  return (
    <div className="relative overflow-hidden rounded-b-[28px] bg-white">

      <div
        className="grid gap-[3px] p-[6px]"
        style={{
          gridTemplateColumns: "2.2fr 1fr 1fr",
          gridTemplateRows: "127px 127px",
        }}
      >

        {/* Main Image */}
        <div
          className="relative overflow-hidden rounded-tl-xl rounded-bl-xl"
          style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}
        >
          <Image
            src={gallery[0]}
            alt="Hotel"
            fill
            unoptimized
            priority
            className="object-cover"
          />


        </div>

        {/* Top Center */}
        <div className="relative overflow-hidden ">
          <Image
            src={gallery[1]}
            alt="Hotel"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Top Right */}
        <div className="relative overflow-hidden  rounded-tr-xl">
          <Image
            src={gallery[2]}
            alt="Hotel"
            fill
            unoptimized
            className="object-cover"
          />


        </div>
        {/* Bottom Center */}
        <div className="relative overflow-hidden ">
          <Image
            src={gallery[3]}
            alt="Hotel"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Bottom Right */}
        <div
          onClick={onOpen}
          className="relative cursor-pointer overflow-hidden rounded-br-xl"
        >
          <Image
            src={gallery[4]}
            alt="Hotel"
            fill
            unoptimized
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          {/* Wishlist */}


          {/* Photos Count */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
            <span className="text-[30px] font-bold leading-none">
              +{Math.max(totalPhotos - 4, 0)}
            </span>

            <span className="mt-2 text-center text-[11px] font-medium leading-4">
              Property &
              <br />
              Guest Photos
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewHotelGalleryMobile;