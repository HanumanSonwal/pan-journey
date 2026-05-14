export const sortHotels = (hotels, sort) => {
  let sorted = [...hotels];

  switch (sort) {
    case "priceLow":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "priceHigh":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "ratingHigh":
      sorted.sort((a, b) => b.starRating - a.starRating);
      break;

    case "ratingLow":
      sorted.sort((a, b) => a.starRating - b.starRating);
      break;

    default:
      break;
  }

  return sorted;
};