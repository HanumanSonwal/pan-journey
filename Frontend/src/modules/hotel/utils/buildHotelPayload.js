import { formatSupplierDate } from "./supplierDate";

export const buildHotelPayload = ({ searchData, filters = {}, sort = "" }) => {
  if (!searchData?.city && !searchData?.cityData?.id) {
    return null;
  }

  const cityData = searchData?.cityData || {};

  const destinationType = cityData?.type?.toLowerCase() || "city";

  const destinationCity =
    cityData?.city || cityData?.name || searchData?.city || "";

  const destinationState = cityData?.state || cityData?.stateName || "";

  const destinationCountry = cityData?.country || "";

  const adults = Number(searchData?.adults) || 1;

  const childrenCount = Number(searchData?.children) || 0;

  const childAges = Array.isArray(searchData?.childAges)
    ? searchData.childAges
    : [];

  const children = childAges
    .slice(0, childrenCount)
    .map((age) => Number(age))
    .filter((age) => !Number.isNaN(age));

  return {
    checkIn: formatSupplierDate(searchData?.checkIn),

    checkOut: formatSupplierDate(searchData?.checkOut),

    destination: {
      type: destinationType,
      city: destinationCity,
      state: destinationState,
      country: destinationCountry,
    },

    rooms: [
      {
        adults,
        children,
      },
    ],
  };
};
