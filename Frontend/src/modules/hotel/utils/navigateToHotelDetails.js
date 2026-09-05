import { slugify } from "@/utils/slug/slugify";
import { buildSelectedHotel } from "./buildSelectedHotel";

export const navigateToHotelDetails = ({
  router,
  hotel,
  searchData,
  setSelectedHotel,
}) => {
  const cityData = searchData?.cityData || {};

  const cityName =
    cityData?.city ||
    cityData?.name ||
    searchData?.city ||
    hotel?.location?.city ||
    hotel?.cityName ||
    hotel?.City ||
    "hotel";

  const citySlug = slugify(cityName?.toString().split(",")[0].trim());

  const hotelName =
    hotel?.name || hotel?.hotelName || hotel?.HotelName || "hotel";

  const hotelSlug = hotel?.hotelSlug || slugify(hotelName);

  const hotelId = hotel?.id || hotel?.hotelId || hotel?.HotelId || "";

  const hotelDetailId = hotel?.hotelDetailId || "";

  if (!hotelId || !hotelDetailId) {
    console.error("Hotel id or hotelDetailId not found", {
      hotelId,
      hotelDetailId,
      hotel,
    });

    return;
  }

  setSelectedHotel?.(
    buildSelectedHotel({
      hotel,
      searchData,
    }),
  );

  router.push(`/hotel-details/${citySlug}/${hotelSlug}`);
};
