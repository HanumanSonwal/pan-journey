export const navigateToHotels = (router, searchData) => {
  const citySlug =
    searchData?.city
      ?.split(",")[0]
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^a-z0-9\s-]/g, "")
      ?.replace(/\s+/g, "-") || "";

  const query = new URLSearchParams({
    city: citySlug,

    cityName: searchData?.city || "",

    cityId: searchData?.cityData?.id || "",

    stateName: searchData?.cityData?.stateName || "",

    countryCode: searchData?.cityData?.countryCode || "",

    checkIn: searchData?.checkIn || "",

    checkOut: searchData?.checkOut || "",

    rooms: String(searchData?.rooms || 1),

    adults: String(searchData?.adults || 2),

    children: String(searchData?.children || 0),

    pets: searchData?.pets ? "true" : "false",
  });

  router.push(`/hotels?${query.toString()}`);
};
