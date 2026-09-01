
import HotelSearch from "./hotelSearch.model.js";

export const saveHotelSearch = async (data) => {
  return HotelSearch.create(data);
};

export const getHotelSearchById = async (searchId) => {
  return HotelSearch.findOne({
    searchId,
  }).lean();
};

export const deleteExpiredHotelSearch = async () => {
  return HotelSearch.deleteMany({
    expiresAt: {
      $lt: new Date(),
    },
  });
};
