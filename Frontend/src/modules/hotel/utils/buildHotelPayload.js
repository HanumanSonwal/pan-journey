import { formatSupplierDate } from "./supplierDate";

export const buildHotelPayload = ({
  searchData,
  filters = {},
  sort = null,
}) => {
  if (!searchData?.city && !searchData?.cityData?.id) {
    return null;
  }

  const cityData = searchData?.cityData || {};
  const destinationType = cityData?.type?.toLowerCase() || "city";
  const destinationCity =
    cityData?.city || cityData?.name || searchData?.city || "";
  const destinationState = cityData?.state || cityData?.stateName || "";
  const destinationCountry = cityData?.country || "";

  let rooms = [];

  if (
    Array.isArray(searchData?.roomGuests) &&
    searchData.roomGuests.length > 0
  ) {
    rooms = searchData.roomGuests.map((room) => ({
      adults: Number(room?.adults) || 1,

      children: Array.isArray(room?.children)
        ? room.children
            .map((child) => ({
              age: Number(child?.age),
            }))
            .filter((child) => !Number.isNaN(child.age))
        : [],
    }));
  } else {
    const adults = Number(searchData?.adults) || 1;
    const childrenCount = Number(searchData?.children) || 0;
    const childAges = Array.isArray(searchData?.childAges)
      ? searchData.childAges
      : [];
    const requiredRooms = Math.max(
      1,
      Math.ceil((adults + childrenCount) / 4),
      Math.ceil(childrenCount / 2),
      Math.ceil(adults / 4),
    );

    const roomCount = Math.min(
      8,
      Math.max(Number(searchData?.rooms) || 1, requiredRooms),
    );

    const roomAdults = Array.from(
      { length: Math.min(roomCount, adults) },
      (_, index) =>
        Math.floor(adults / Math.min(roomCount, adults)) +
        (index < adults % Math.min(roomCount, adults) ? 1 : 0),
    );

    let ageIndex = 0;

    rooms = roomAdults.map((roomAdultsCount) => {
      const maxChildren = Math.min(2, 4 - roomAdultsCount);

      const roomChildren = [];

      while (roomChildren.length < maxChildren && ageIndex < childrenCount) {
        const age = childAges[ageIndex];

        if (age !== "" && age !== null && age !== undefined) {
          roomChildren.push({
            age: Number(age),
          });
        }

        ageIndex++;
      }

      return {
        adults: roomAdultsCount,
        children: roomChildren,
      };
    });
  }

  const search = filters?.search || "";
  const starCategory = filters?.starCategory || filters?.starRating || "";
  const minPrice = filters?.minPrice ?? "";
  const maxPrice = filters?.maxPrice ?? "";
  const facility = filters?.facility || "";

  let sortBy = "";
  let sortOrder = "";

  switch (sort) {
    case "ratingHigh":
      sortBy = "starCategory";
      sortOrder = "desc";
      break;

    case "ratingLow":
      sortBy = "starCategory";
      sortOrder = "asc";
      break;

    case "priceHigh":
      sortBy = "pricing.totalAmount";
      sortOrder = "desc";
      break;

    case "priceLow":
      sortBy = "pricing.totalAmount";
      sortOrder = "asc";
      break;

    default:
      sortBy = "";
      sortOrder = "";
      break;
  }

  return {
    checkIn: formatSupplierDate(searchData?.checkIn),

    checkOut: formatSupplierDate(searchData?.checkOut),

    destination: {
      type: destinationType,
      city: destinationCity,
      state: destinationState,
      country: destinationCountry,
    },

    rooms,

    search,
    starCategory,
    minPrice,
    maxPrice,
    facility,

    sortBy,
    sortOrder,
  };
};
