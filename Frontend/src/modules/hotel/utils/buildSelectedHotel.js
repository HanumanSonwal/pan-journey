import { slugify } from "@/utils/slug/slugify";

export const buildSelectedHotel = ({ hotel = {}, searchData = {} }) => {
  const hotelId = hotel?.id || hotel?.hotelId || hotel?.HotelId || "";

  const hotelName = hotel?.name || hotel?.hotelName || hotel?.HotelName || "";

  return {
    hotelKey: hotel?.hotelKey || hotel?.HotelKey || hotel?.hotelkey || "",

    searchKey: hotel?.searchKey || hotel?.SearchKey || "",

    hotelMeta: {
      hotelId,

      hotelSlug: slugify(hotelName),

      cityId: searchData?.cityData?.id || "",

      cityName: searchData?.city || "",

      stateName: searchData?.cityData?.stateName || "",

      countryCode: searchData?.cityData?.countryCode || "",
    },
  };
};
