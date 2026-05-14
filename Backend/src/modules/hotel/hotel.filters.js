export const filterHotels = (hotels, filters = {}) => {
  let filtered = [...hotels];

  if (filters.minPrice || filters.maxPrice) {
    filtered = filtered.filter(hotel => {
      const price = hotel.price || 0;
      return (
        (!filters.minPrice || price >= filters.minPrice) &&
        (!filters.maxPrice || price <= filters.maxPrice)
      );
    });
  }

  if (filters.starRating) {
    filtered = filtered.filter(
      hotel => hotel.starRating == filters.starRating
    );
  }

  if (filters.freeCancellation) {
    filtered = filtered.filter(hotel => hotel.freeCancellation === true);
  }

  if (filters.search) {
    filtered = filtered.filter(hotel =>
      hotel.hotelName.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  return filtered;
};