import { slugify } from "@/utils/slug/slugify";

export const buildHotelUrl = ({
  hotelName = "",
  cityName = "",
  hotelId = "",
}) => {
  if (!hotelName || !hotelId) {
    return "";
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const citySlug = slugify(cityName);

  const hotelSlug = slugify(hotelName);

  return `${siteUrl}/hotel-details/${citySlug}/${hotelSlug}?hid=${hotelId}`;
};
