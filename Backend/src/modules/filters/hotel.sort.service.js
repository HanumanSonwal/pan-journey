export const applyHotelSorting = (hotels, sort) => {
  if (!sort) return hotels;

  const sorted = [...hotels];

  switch (sort) {
    case "price_low":
      return sorted.sort((a, b) => a.Price.RoomPrice - b.Price.RoomPrice);

    case "price_high":
      return sorted.sort((a, b) => b.Price.RoomPrice - a.Price.RoomPrice);

    case "star_high":
      return sorted.sort((a, b) => b.StarRating - a.StarRating);

    default:
      return hotels;
  }
};