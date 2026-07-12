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
      hotel?.cityName ||
      hotel?.City ||
      "hotel",
  );

  const hotelSlug = slugify(
    hotel?.name || hotel?.hotelName || hotel?.HotelName || "hotel",
  );

  const hotelId = hotel?.hotelId || hotel?.HotelId || hotel?.id;

  setSelectedHotel(
    buildSelectedHotel({
      hotel,
      searchData,
    }),
  );

  router.push(`/hotel-details/${citySlug}/${hotelSlug}?hid=${hotelId}`);
};
