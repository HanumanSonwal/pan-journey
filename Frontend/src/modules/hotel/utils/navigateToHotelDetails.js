import { slugify } from "@/utils/slug/slugify";
import { buildSelectedHotel } from "./buildSelectedHotel";

export const navigateToHotelDetails = ({
  router,
  hotel,
  searchData,
  setSelectedHotel, 
}) => {
  const citySlug = slugify(
    searchData?.city?.split(",")[0] ||
      hotel?.cityName?.split(",")[0] ||
      hotel?.City ||
      "hotel",
  );

  const hotelSlug =
    hotel?.hotelSlug ||
    slugify(hotel?.name || hotel?.hotelName || hotel?.HotelName || "hotel");

  const hotelId = hotel?.id || hotel?.hotelId || hotel?.HotelId || "";

  if (!hotelId) {
    console.error("Hotel id not found");
    return;
  }

  setSelectedHotel?.(
    buildSelectedHotel({
      hotel,
      searchData,
    }),
  );

  router.push(`/hotel-details/${citySlug}/${hotelSlug}?hid=${hotelId}`);
};
