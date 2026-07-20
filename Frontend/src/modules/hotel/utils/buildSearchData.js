export const buildSearchData = ({
  baseSearchData,
  city,
  cityId,
  stateName = "",
  countryCode = "",
}) => {
  return {
    ...baseSearchData,

    city,

    cityData: {
      ...baseSearchData?.cityData,

      id: cityId,
      name: city,
      stateName: stateName || baseSearchData?.cityData?.stateName || "",
      countryCode: countryCode || baseSearchData?.cityData?.countryCode || "",
    },
  };
};
