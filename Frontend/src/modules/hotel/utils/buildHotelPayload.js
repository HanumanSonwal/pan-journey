import { formatSupplierDate } from "./supplierDate";

export const buildHotelPayload = ({ searchData, filters = {}, sort = "" }) => {
  if (!searchData?.city && !searchData?.cityData?.id) {
    return null;
  }

  return {
    HotelSeedValue: "",
    CheckInDate: formatSupplierDate(searchData?.checkIn),
    CheckOutDate: formatSupplierDate(searchData?.checkOut),
    HotelRoomDetail: [
      {
        AdultCount: searchData?.adults || 1,
        ChildCount: searchData?.children || 0,
        Child1Age: searchData?.childAges?.[0] || 0,
        Child2Age: searchData?.childAges?.[1] || 0,
      },
    ],

    fullName: searchData?.city || "",
    id: searchData?.cityData?.id || "",
    stateName: searchData?.cityData?.stateName || "",
    countryCode: searchData?.cityData?.countryCode || "",
    RoomCount: searchData?.rooms || 1,
    filters: {
      search: filters?.search || "",
      freeCancellation: filters?.freeCancellation || false,
      starRating: filters?.starRating || "",
      minPrice: filters?.minPrice || "",
      maxPrice: filters?.maxPrice || "",
    },
    sort,
  };
};
