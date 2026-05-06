"use client";

import { useEffect, useState } from "react";
import HotelCard from "../../../shared/home/components/HotelCard";

export default function HotelList({ filters, sort }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH HOTELS
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        const hotelImages = [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb2107c",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        ];

        const mapped = data.products.map((item, i) => ({
          id: item.id,
          name: item.title,

          location: ["Goa", "Delhi", "Manali", "Jaipur", "Mumbai"][i % 5],

          price: item.price,
          oldPrice: item.price + 400,

          rating: Number(item.rating || 4.2),
          reviews: Math.floor(Math.random() * 200) + 20,

          // 🏨 REAL HOTEL IMAGE FIX
          image: hotelImages[i % hotelImages.length],

          images: [
            hotelImages[i % hotelImages.length],
            hotelImages[(i + 1) % hotelImages.length],
            hotelImages[(i + 2) % hotelImages.length],
          ],

          propertyType: ["Hotel", "Resort", "Villa"][i % 3],

          tags: ["Free WiFi", "Couple Friendly", "Breakfast"],
        }));

        setHotels(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // 🔥 FILTER ENGINE
  let filtered = hotels.filter((h) => {
    if (filters.city && h.location !== filters.city) return false;

    if (
      filters.search &&
      !h.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    if (filters.min !== undefined && h.price < filters.min) return false;
    if (filters.max !== undefined && h.price > filters.max) return false;

    if (filters.location?.length) {
      if (!filters.location.includes(h.location)) return false;
    }

    if (filters.propertyType?.length) {
      if (!filters.propertyType.includes(h.propertyType)) return false;
    }

    if (filters.rating?.length) {
      const match = filters.rating.some((r) => h.rating >= parseFloat(r));
      if (!match) return false;
    }

    return true;
  });

  // 🔵 SORT
  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceHigh") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  if (sort === "popular") filtered.sort((a, b) => b.reviews - a.reviews);

  if (loading) {
    return <div className="text-center py-10">Loading hotels...</div>;
  }

  if (!filtered.length) {
    return <div className="text-center py-10">No hotels found 😔</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filtered.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
