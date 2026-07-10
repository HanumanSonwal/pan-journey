export const paginateHotels = (hotels, pagination = {}) => {
  const page = pagination.page || 1;
  const limit = pagination.limit || 20;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

   const paginatedHotels = hotels.slice(startIndex, endIndex);

  return {
    hotels: paginatedHotels,
    page,
    limit,
    totalPages: Math.ceil(hotels.length / limit),
    totalHotels: hotels.length,
  };
};