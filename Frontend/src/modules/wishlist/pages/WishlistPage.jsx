"use client";

import { useRouter } from "next/navigation";
import { useWishlist } from "../hooks/useWishlist";

export default function WishlistPage() {
  const { data, isLoading } = useWishlist();
  const router = useRouter();

  if (isLoading) {
    return <div className="p-10">Loading...</div>;
  }

  const destinations = data?.data || [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">❤️ Saved Destinations</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <div
            key={destination.cityId}
            onClick={() => router.push(`/wishlist/${destination.cityId}`)}
            className="cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
          >
            <img
              src={destination.coverImage}
              alt={destination.cityName}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold">{destination.cityName}</h3>

              <p className="mt-2 text-gray-500">
                {destination.hotelCount} Hotels
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
