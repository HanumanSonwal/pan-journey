// "use client";

// import dayjs from "dayjs";
// import HotelCard from "../../../shared/home/components/HotelCard";
// import { useHotels } from "../../hooks/useHotels";
// import { useMemo } from "react";
// export default function HotelList({ searchData, filters, sort, page }) {
//   const payload = useMemo(() => {
//     if (!searchData?.cityData?.id) return null;

//     return {
//       HotelSeedValue: "",
//       CheckInDate: searchData?.checkIn
//         ? dayjs(searchData.checkIn).format("MM/DD/YYYY")
//         : "",
//       CheckOutDate: searchData?.checkOut
//         ? dayjs(searchData.checkOut).format("MM/DD/YYYY")
//         : "",
//       HotelRoomDetail: [
//         {
//           AdultCount: searchData?.adults || 1,
//           ChildCount: searchData?.children || 0,
//           Child1Age: searchData?.childAges?.[0] || 0,
//           Child2Age: searchData?.childAges?.[1] || 0,
//         },
//       ],
//       fullName: searchData?.city || "",
//       id: searchData?.cityData?.id || "",
//       RoomCount: searchData?.rooms || 1,
//       filters: {
//         search: filters?.search || "",
//         suggested: filters?.suggested || [],
//         propertyType: filters?.propertyType || [],
//         starCategory: filters?.starCategory || [],
//         rating: filters?.rating || [],
//         locations: filters?.locations || [],
//         priceMin: filters?.priceMin ?? 0,
//         priceMax: filters?.priceMax ?? 50000,
//       },
//       sort: sort || "",
//       pagination: {
//         page: page || 1,
//         limit: 10,
//       },
//     };
//   }, [searchData, filters, sort, page]);
//   const { data, isLoading, isError, error } = useHotels(payload);
//   const hotels = data?.data?.hotels?.hotels || [];
//   console.log("🚀 FULL RESPONSE:", data);
//   console.log("🏨 HOTELS:", hotels);
//   if (isLoading) {
//     return <div className="py-10 text-center">Loading hotels...</div>;
//   }
//   if (isError) {
//     return (
//       <div className="py-10 text-center text-red-500">
//         {error?.message || "Failed to fetch hotels"}
//       </div>
//     );
//   }
//   if (!hotels.length) {
//     return <div className="py-10 text-center">No hotels found 😔</div>;
//   }
//   return (
//     <div className="flex flex-col gap-4">
//       {hotels.map((hotel) => {
//         const mappedHotel = {
//           id: hotel.hotelId || Math.random(),
//           name: hotel.hotelName || "Hotel Name",
//           location: hotel.location || hotel.address || "Location",
//           address: hotel.address || "",
//           rating: Number(hotel.starRating || 0),
//           reviews: hotel.reviewCount || 0,
//           price: hotel.price || hotel.minPrice || 0,
//           oldPrice: hotel.oldPrice || hotel.price || 0,
//           propertyType: hotel.propertyType || "Hotel",
//           image:
//             hotel.image ||
//             hotel.thumbnail ||
//             hotel.hotelImage ||
//             "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//           images: hotel.images || [
//             hotel.image ||
//               hotel.thumbnail ||
//               hotel.hotelImage ||
//               "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//           ],

//           tags: hotel.tags || ["Free WiFi", "Couple Friendly"],
//           starRating: hotel.starRating || "",
//           description: hotel.description || "",
//         };
//         return <HotelCard key={mappedHotel.id} hotel={mappedHotel} />;
//       })}
//     </div>
//   );
// }

"use client";

import dayjs from "dayjs";

import { useEffect, useMemo, useRef } from "react";

import HotelCard from "../../../shared/home/components/HotelCard";

import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";

export default function HotelList({ searchData, filters, sort, page }) {
  // PAYLOAD
  const payload = useMemo(() => {
    if (!searchData?.cityData?.id) return null;

    return {
      HotelSeedValue: "",

      CheckInDate: searchData?.checkIn
        ? dayjs(searchData.checkIn).format("MM/DD/YYYY")
        : "",

      CheckOutDate: searchData?.checkOut
        ? dayjs(searchData.checkOut).format("MM/DD/YYYY")
        : "",

      HotelRoomDetail: [
        {
          AdultCount: searchData?.adults || 1,

          ChildCount: searchData?.children || 0,

          Child1Age: searchData?.childAges?.[0] || 0,

          Child2Age: searchData?.childAges?.[1] || 0,
        },
      ],

      fullName: searchData?.city || "",

      id: searchData?.cityData?.id || "",

      RoomCount: searchData?.rooms || 1,

      filters: {
        search: filters?.search || "",

        suggested: filters?.suggested || [],

        propertyType: filters?.propertyType || [],

        starCategory: filters?.starCategory || [],

        rating: filters?.rating || [],

        locations: filters?.locations || [],

        priceMin: filters?.priceMin ?? 0,

        priceMax: filters?.priceMax ?? 50000,
      },

      sort: sort || "",
    };
  }, [searchData, filters, sort, page]);

  // API
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHotels(payload);

  // LOAD MORE REF
  const loadMoreRef = useRef(null);

  // INTERSECTION OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // FLAT HOTELS
  const hotels = useMemo(() => {
    const allHotels =
      data?.pages?.flatMap((page) => page?.data?.hotels?.hotels || []) || [];

    const uniqueHotels = Array.from(
      new Map(allHotels.map((hotel) => [hotel.hotelId, hotel])).values(),
    );

    return uniqueHotels;
  }, [data]);

  // MAPPED HOTELS
  const mappedHotels = useMemo(() => {
    return hotels.map((hotel) => ({
      id: hotel.hotelId,

      name: hotel.hotelName || "Hotel Name",

      location: hotel.location || hotel.address || "Location",

      address: hotel.address || "",

      rating: Number(hotel.starRating || 0),

      reviews: hotel.reviewCount || 0,

      price: hotel.price || hotel.minPrice || 0,

      oldPrice: hotel.oldPrice || (hotel.price ? hotel.price + 1500 : 0),

      propertyType: hotel.propertyType || "Hotel",

      image:
        hotel.image ||
        hotel.thumbnail ||
        hotel.hotelImage ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",

      images:
        hotel.images?.length > 0
          ? hotel.images
          : [
              hotel.image ||
                hotel.thumbnail ||
                hotel.hotelImage ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
            ],

      tags: hotel.facilities?.slice(0, 3) || [],

      starRating: hotel.starRating || "",

      description: hotel.description || "",
    }));
  }, [hotels]);

  // LOADING
  if (isLoading) {
    return <div className="py-10 text-center">Loading hotels...</div>;
  }

  // ERROR
  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.message || "Failed to fetch hotels"}
      </div>
    );
  }

  // EMPTY
  if (!mappedHotels.length) {
    return <div className="py-10 text-center">No hotels found 😔</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* HOTELS */}
      {mappedHotels.map((hotel, index) => (
        <HotelCard key={hotel.id || index} hotel={hotel} />
      ))}
      {/* LOAD MORE */}
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage && (
          <div className="text-sm text-gray-500">Loading more hotels...</div>
        )}

        {!hasNextPage && (
          <div className="text-sm text-gray-400">No more hotels</div>
        )}
      </div>
    </div>
  );
}
