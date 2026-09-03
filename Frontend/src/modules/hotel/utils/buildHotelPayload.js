import { formatSupplierDate } from "./supplierDate";

export const buildHotelPayload = ({
  searchData,
  filters = {},
  sort = null,
}) => {
  /* =========================================================
     VALIDATION
  ========================================================= */

  if (!searchData?.city && !searchData?.cityData?.id) {
    return null;
  }

  const cityData = searchData?.cityData || {};

  /* =========================================================
     DESTINATION
  ========================================================= */

  const destinationType = cityData?.type?.toLowerCase() || "city";

  const destinationCity =
    cityData?.city || cityData?.name || searchData?.city || "";

  const destinationState = cityData?.state || cityData?.stateName || "";

  const destinationCountry = cityData?.country || "";

  /* =========================================================
     GUESTS
  ========================================================= */

  const adults = Number(searchData?.adults) || 1;

  const childrenCount = Number(searchData?.children) || 0;

  const childAges = Array.isArray(searchData?.childAges)
    ? searchData.childAges
    : [];

  const children = childAges
    .slice(0, childrenCount)
    .map((age) => Number(age))
    .filter((age) => !Number.isNaN(age));

  /* =========================================================
     FILTERS
  ========================================================= */

  const search = filters?.search || "";

  const starCategory = filters?.starCategory || filters?.starRating || "";

  const minPrice = filters?.minPrice ?? "";

  const maxPrice = filters?.maxPrice ?? "";

  /*
   * Backend currently expects:
   *
   * facility: ""
   *
   * Sidebar ka exact facility state abhi
   * available nahi hai, isliye undefined
   * value ko empty string bhej rahe hain.
   */

  const facility = filters?.facility || "";

  /* =========================================================
     SORTING
     
     Frontend SortBar values:
     
     ratingHigh
     ratingLow
     priceHigh
     priceLow
  ========================================================= */

  let sortBy = "pricing";
  let sortOrder = "asc";

  switch (sort) {
    case "ratingHigh":
      sortBy = "rating";
      sortOrder = "desc";
      break;

    case "ratingLow":
      sortBy = "rating";
      sortOrder = "asc";
      break;

    case "priceHigh":
      sortBy = "pricing";
      sortOrder = "desc";
      break;

    case "priceLow":
      sortBy = "pricing";
      sortOrder = "asc";
      break;

    default:
      /*
       * No sorting selected.
       *
       * Backend default:
       * pricing → ascending
       */
      break;
  }

  /* =========================================================
     PAYLOAD
     
     page / limit are intentionally NOT added here.
     
     useInfiniteHotels controls them using pageParam.
  ========================================================= */

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

    search,

    starCategory,

    minPrice,

    maxPrice,

    facility,

    sortBy,

    sortOrder,
  };
};
