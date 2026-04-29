// export const mapSupplierHotels = (data, city) => {
//   const rooms = data?.BlockRoomResult?.HotelRoomsDetails || [];

//   return rooms.map(room => ({
//     supplierHotelId: room.RoomId,
//     name: data.BlockRoomResult.HotelName,
//     city,
//     address: data.BlockRoomResult.AddressLine1,
//     starRating: data.BlockRoomResult.StarRating,
//     latitude: data.BlockRoomResult.Latitude,
//     longitude: data.BlockRoomResult.Longitude,
//     amenities: room.Amenities?.map(a => a.Name) || [],
//     images: [],
//     lastUpdated: new Date(),
//   }));
// };

export const mapSupplierHotels = (data, city) => {
  const hotels = data?.hotels || [];

  return hotels
    .filter((hotel) => hotel.city.toLowerCase() === city.toLowerCase())
    .map((hotel) => ({
      supplierHotelId: hotel.id,
      name: hotel.name,
      city: hotel.city.toLowerCase(),
      address: "Address not provided",
      starRating: hotel.rating,
      latitude: 0,
      longitude: 0,
      amenities: hotel.amenities || [],
      images: hotel.images || [],
      lastUpdated: new Date(),
    }));
};
