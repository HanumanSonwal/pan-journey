const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop";

export const mapHotelsForCard = ({
  hotels = [],
  currencySymbol = "₹",
  searchKey = "",
}) => {
  return hotels.map((hotel) => {
    const image =
      hotel.image || hotel.thumbnail || hotel.hotelImage || DEFAULT_IMAGE;

    return {
      id: hotel.hotelId,
      currencySymbol,
      name: hotel.hotelName || "Hotel Name",
      hotelkey: hotel.hotelkey || "",
      facilities: hotel.facilities || [],
      location: hotel.location || hotel.address || "Location",
      latitude: Number(hotel.latitude || 0),
      longitude: Number(hotel.longitude || 0),
      address: hotel.address || "",
      rating: Number(hotel.starRating || 0),
      reviews: Number(hotel.reviewCount || 0),
      price: Number(hotel.basePrice || 0),

      oldPrice:
        Number(hotel.oldPrice) ||
        (hotel.price ? Number(hotel.price) + 1500 : 0),
      propertyType: hotel.propertyType || "Hotel",
      searchKey,
      image,
      images: hotel.images?.length > 0 ? hotel.images : [image],
      tags: hotel.facilities?.slice(0, 3) || [],
      starRating: hotel.starRating || "",
      description: hotel.description || "",
      freeCancellation: Boolean(hotel.freeCancellation),
      tax: Number(hotel.platformfeeandtax || 0),
    };
  });
};
