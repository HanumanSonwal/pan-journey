const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop";

const cleanImageUrl = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  const cleaned = value.trim();

  if (!cleaned) {
    return "";
  }

  return cleaned;
};

export const mapHotelsForCard = ({
  hotels = [],
  currencySymbol = "₹",
  searchKey = "",
}) => {
  return hotels.map((hotel) => {
    const location = hotel?.location || {};
    const pricing = hotel?.pricing || {};
    const rating = hotel?.rating || {};

    const rawImage =
      hotel?.image || hotel?.thumbnail || hotel?.hotelImage || "";

    const image = cleanImageUrl(rawImage) || DEFAULT_IMAGE;

    const additionalImages = Array.isArray(hotel?.images)
      ? hotel.images.map(cleanImageUrl).filter(Boolean)
      : [];

    const images = additionalImages.length > 0 ? additionalImages : [image];

    const hotelId = hotel?.id || hotel?.hotelId || hotel?.HotelId || "";
    const hotelDetailId = hotel?.hotelDetailId || "";

    const hotelName =
      hotel?.name || hotel?.hotelName || hotel?.HotelName || "Hotel Name";

    const latitude = Number(location?.latitude ?? hotel?.latitude ?? 0);

    const longitude = Number(location?.longitude ?? hotel?.longitude ?? 0);

    const address = location?.address || hotel?.address || "";

    const city = location?.city || hotel?.city || "";

    const state = location?.state || hotel?.state || "";

    const country = location?.country || hotel?.country || "";

    const locationText =
      [city, state, country].filter(Boolean).join(", ") ||
      address ||
      "Location";

    const facilities = Array.isArray(hotel?.facilities)
      ? hotel.facilities
          .map((facility) => {
            if (typeof facility === "string") {
              return facility.trim();
            }

            return facility?.name?.toString().trim() || "";
          })
          .filter(Boolean)
      : [];

    const tags = facilities.slice(0, 3);

    const basicAmount = Number(pricing?.basicAmount) || 0;

    const tax = Number(pricing?.tax) || 0;

    const totalAmount = Number(pricing?.totalAmount) || basicAmount + tax;

    const ratingValue = Number(rating?.id) || 0;

    return {
      id: hotelId,
      hotelDetailId,

      currencySymbol,

      name: hotelName,

      hotelkey: hotel?.hotelkey || hotel?.hotelKey || hotelId || "",

      description: hotel?.description || "",

      location: locationText,

      address,

      city,

      state,

      country,

      latitude,

      longitude,

      rating: ratingValue,

      reviews: Number(hotel?.reviewCount) || 0,

      starRating: ratingValue || "",

      price: basicAmount,

      oldPrice: Number(hotel?.oldPrice) || 0,

      tax,

      totalAmount,

      facilities,

      tags,

      propertyType: hotel?.propertyType || "Hotel",

      searchKey,

      image,

      images,

      freeCancellation: Boolean(hotel?.freeCancellation),

      rawHotel: hotel,
    };
  });
};
