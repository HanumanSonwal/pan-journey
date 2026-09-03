const createSlug = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const navigateToHotels = (router, searchData) => {
  const cityData = searchData?.cityData || {};
  const destinationType = cityData?.type?.toLowerCase() || "";
  const destinationId = cityData?.id || "";
  const destinationName =
    cityData?.name || cityData?.city || searchData?.city || "";
  const destinationCity = cityData?.city || cityData?.name || "";
  const destinationState = cityData?.state || cityData?.stateName || "";
  const destinationCountry = cityData?.country || "";
  const destinationCountryCode = cityData?.countryCode || "";
  const displayName =
    cityData?.displayName || searchData?.city || destinationName;
  const citySlug = createSlug(destinationCity);

  const query = new URLSearchParams({
    city: citySlug,
    cityName: displayName,
    cityId: destinationId,
    destinationType,
    destinationCity,
    stateName: destinationState,
    country: destinationCountry,
    countryCode: destinationCountryCode,
    checkIn: searchData?.checkIn || "",
    checkOut: searchData?.checkOut || "",

    rooms: String(searchData?.rooms || 1),
    adults: String(searchData?.adults || 2),
    children: String(searchData?.children || 0),

    pets: searchData?.pets ? "true" : "false",
  });

  router.push(`/hotels?${query.toString()}`);
};
