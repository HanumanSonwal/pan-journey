export const buildSelectedHotel = ({ hotel, searchData }) => ({
  hotelKey: hotel?.hotelKey || hotel?.HotelKey || hotel?.hotelkey || "",

  searchKey: hotel?.searchKey || hotel?.SearchKey || "",

  hotelMeta: {
    hotelId: hotel?.hotelId || hotel?.HotelId || hotel?.id || "",

    cityName: searchData?.cityData?.id || "",

    stateName: searchData?.cityData?.stateName || "",

    countryCode: searchData?.cityData?.countryCode || "",
  },
});
