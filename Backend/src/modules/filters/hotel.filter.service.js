export const applyHotelFilters = (hotels, query) => {
  let filtered = [...hotels];

  if (query.priceMin || query.priceMax) {
    const min = Number(query.priceMin || 0);
    const max = Number(query.priceMax || Infinity);

    filtered = filtered.filter(
      h => h.Price.RoomPrice >= min && h.Price.RoomPrice <= max
    );
  }

  if (query.star) {
    filtered = filtered.filter(h => h.StarRating >= Number(query.star));
  }

  return filtered;
};