export const mapHotelDetails = (hotel) => {
  if (!hotel) return null;

  return {
    name: hotel.AboutHotel,
    address: hotel.Address,
    city: hotel.City,
    country: hotel.Country,

    description: hotel.AboutHotel,

    thumbnail: hotel.HotelImage,

    amenities: hotel.Amenities
      ? hotel.Amenities.split(",").filter(Boolean)
      : [],

    images:
      hotel.HotelGallery?.map((img) => ({
        url: img.ImageURL,
        caption: img.ImageDesc,
      })) || [],
  };
};