// "use client";

// import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
// import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
// import { memo, useEffect, useMemo, useRef } from "react";

// import HotelCard from "../../cards/HotelCard";
// import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
// import { buildHotelPayload } from "../../utils/buildHotelPayload";
// import { mapHotelsForCard } from "../../utils/mapHotelsForCard";
// import HotelNotFound from "./HotelNotFound";

// function HotelList({
//   searchData,
//   filters,
//   sort,
//   onHotelsChange,
//   onLoadingChange,
//   onResultChange,
// }) {
//   const { data: wishlistIdsData } = useWishlistIds();

//   const wishlistIds = useMemo(() => {
//     return new Set(wishlistIdsData || []);
//   }, [wishlistIdsData]);

//   const payload = useMemo(() => {
//     return buildHotelPayload({
//       searchData,
//       filters,
//       sort,
//     });
//   }, [searchData, filters, sort]);

//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//   } = useInfiniteHotels(payload);

//   useEffect(() => {
//     onLoadingChange?.(isLoading);
//   }, [isLoading, onLoadingChange]);

//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     const target = loadMoreRef.current;
//     if (!target) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];
//         if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
//           fetchNextPage();
//         }
//       },
//       {
//         rootMargin: "400px 0px",
//         threshold: 0,
//       },
//     );

//     observer.observe(target);

//     return () => {
//       observer.unobserve(target);
//       observer.disconnect();
//     };
//   }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   const hotels = useMemo(() => {
//     const allHotels =
//       data?.pages?.flatMap((page) => page?.data?.hotels || []) || [];

//     return Array.from(
//       new Map(
//         allHotels.map((hotel, index) => [
//           hotel?.hotelId || hotel?.id || hotel?.HotelId || `hotel-${index}`,
//           hotel,
//         ]),
//       ).values(),
//     );
//   }, [data]);

//   const currencySymbol =
//     data?.pages?.[0]?.data?.currencySymbol ||
//     data?.pages?.[0]?.data?.CurrencySymbol ||
//     "₹";

//   const searchKey =
//     data?.pages?.[0]?.data?.searchKey ||
//     data?.pages?.[0]?.data?.SearchKey ||
//     "";

//   const mappedHotels = useMemo(() => {
//     const result = mapHotelsForCard({
//       hotels,
//       currencySymbol,
//       searchKey,
//     });

//     return result.map((mappedHotel, index) => {
//       const originalHotel = hotels[index];

//       return {
//         ...originalHotel,
//         ...mappedHotel,

//         images:
//           mappedHotel?.images ??
//           mappedHotel?.hotelImages ??
//           mappedHotel?.photos ??
//           mappedHotel?.gallery ??
//           originalHotel?.images ??
//           originalHotel?.hotelImages ??
//           originalHotel?.photos ??
//           originalHotel?.gallery ??
//           [],

//         hotelImages:
//           mappedHotel?.hotelImages ?? originalHotel?.hotelImages ?? [],
//         photos: mappedHotel?.photos ?? originalHotel?.photos ?? [],
//         gallery: mappedHotel?.gallery ?? originalHotel?.gallery ?? [],
//       };
//     });
//   }, [hotels, currencySymbol, searchKey]);

//   useEffect(() => {
//     console.log("================ HOTEL LIST API ================");
//     console.log("TOTAL RAW HOTELS 👉", hotels.length);
//     console.log("FIRST RAW HOTEL 👉", hotels[0]);
//     console.log("FIRST RAW HOTEL IMAGES 👉", hotels[0]?.images);
//     console.log("FIRST RAW HOTEL HOTELIMAGES 👉", hotels[0]?.hotelImages);
//     console.log("FIRST RAW HOTEL PHOTOS 👉", hotels[0]?.photos);
//     console.log("FIRST RAW HOTEL GALLERY 👉", hotels[0]?.gallery);
//     console.log("FIRST MAPPED HOTEL 👉", mappedHotels[0]);
//     console.log("FIRST MAPPED HOTEL IMAGES 👉", mappedHotels[0]?.images);
//     console.log("================================================");
//   }, [hotels, mappedHotels]);

//   useEffect(() => {
//     onHotelsChange?.(mappedHotels);
//   }, [mappedHotels, onHotelsChange]);

//   useEffect(() => {
//     onResultChange?.(mappedHotels.length > 0);
//   }, [mappedHotels, onResultChange]);

//   if (isLoading) {
//     return <HotelContentLoader />;
//   }

//   if (isError) {
//     return <HotelNotFound type="error" />;
//   }

//   if (!mappedHotels.length) {
//     return <HotelNotFound type="not-found" />;
//   }

//   return (
//     <div className="w-full space-y-4">
//       {/* HOTELS */}

//       {mappedHotels.map((hotel, index) => (
//         <HotelCard
//           key={hotel?.id || hotel?.hotelId || index}
//           hotel={hotel}
//           wishlistIds={wishlistIds}
//         />
//       ))}

//       {/* LOAD MORE */}

//       {(hasNextPage || isFetchingNextPage) && (
//         <div ref={loadMoreRef} className="flex justify-center py-6">
//           {isFetchingNextPage && (
//             <div className="text-sm text-gray-500">Loading more hotels...</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default memo(HotelList);

"use client";

import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { memo, useEffect, useMemo, useRef } from "react";

import HotelCard from "../../cards/HotelCard";
import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
import { buildHotelPayload } from "../../utils/buildHotelPayload";
import { mapHotelsForCard } from "../../utils/mapHotelsForCard";
import HotelNotFound from "./HotelNotFound";

function HotelList({
  searchData,
  filters,
  sort,
  onHotelsChange,
  onLoadingChange,
  onResultChange,
}) {
  /* =========================================================
     WISHLIST
  ========================================================= */

  const { data: wishlistIdsData } = useWishlistIds();

  const wishlistIds = useMemo(
    () => new Set(wishlistIdsData || []),
    [wishlistIdsData],
  );

  /* =========================================================
     BUILD API PAYLOAD
     
     searchData + filters + sort
     are converted into the backend payload.
  ========================================================= */

  const payload = useMemo(() => {
    return buildHotelPayload({
      searchData,
      filters,
      sort,
    });
  }, [searchData, filters, sort]);

  /* =========================================================
     HOTEL API
     
     Pagination is handled inside useInfiniteHotels.
  ========================================================= */

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHotels(payload);

  /* =========================================================
     LOADING CALLBACK
  ========================================================= */

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  /* =========================================================
     LOAD MORE / INFINITE SCROLL
  ========================================================= */

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /* =========================================================
     COMBINE ALL PAGES
  ========================================================= */

  const hotels = useMemo(() => {
    const allHotels =
      data?.pages?.flatMap((page) => page?.data?.hotels || []) || [];

    /*
     * Remove duplicate hotels when multiple pages
     * contain the same hotel.
     */

    return Array.from(
      new Map(
        allHotels.map((hotel, index) => [
          hotel?.id || hotel?.hotelId || hotel?.HotelId || `hotel-${index}`,
          hotel,
        ]),
      ).values(),
    );
  }, [data]);

  /* =========================================================
     RESPONSE META
  ========================================================= */

  const currencySymbol =
    data?.pages?.[0]?.data?.currencySymbol ||
    data?.pages?.[0]?.data?.CurrencySymbol ||
    "₹";

  const searchKey =
    data?.pages?.[0]?.data?.searchKey ||
    data?.pages?.[0]?.data?.SearchKey ||
    "";

  /* =========================================================
     MAP API HOTELS → HOTEL CARD DATA
  ========================================================= */

  const mappedHotels = useMemo(() => {
    return mapHotelsForCard({
      hotels,
      currencySymbol,
      searchKey,
    });
  }, [hotels, currencySymbol, searchKey]);

  /* =========================================================
     HOTELS CALLBACK
  ========================================================= */

  useEffect(() => {
    onHotelsChange?.(mappedHotels);
  }, [mappedHotels, onHotelsChange]);

  /* =========================================================
     RESULT CALLBACK
  ========================================================= */

  useEffect(() => {
    onResultChange?.(mappedHotels.length > 0);
  }, [mappedHotels, onResultChange]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return <HotelContentLoader />;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return <HotelNotFound type="error" />;
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!mappedHotels.length) {
    return <HotelNotFound type="not-found" />;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="w-full space-y-4">
      {/* HOTEL LIST */}

      {mappedHotels.map((hotel, index) => (
        <HotelCard
          key={hotel?.id || hotel?.hotelId || index}
          hotel={hotel}
          wishlistIds={wishlistIds}
        />
      ))}

      {/* =====================================================
          LOAD MORE
          
          This appears only when another page is available.
      ===================================================== */}

      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="flex justify-center py-6">
          {isFetchingNextPage && (
            <div className="text-sm text-gray-500">Loading more hotels...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(HotelList);
