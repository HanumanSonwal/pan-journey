import { api } from "@/services/axios";

export const toggleWishlist = async (payload) => {
  const { data } = await api.post("/wishlist/toggle", payload);

  return data;
};

export const checkWishlist = async (hotelId) => {
  const { data } = await api.get(`/wishlist/check/${hotelId}`);

  return data;
};

export const getWishlist = async () => {
  const { data } = await api.get("/wishlist");

  return data;
};

export const getWishlistIds = async () => {
  const { data } = await api.get("/wishlist/hotel-ids");

  return data;
};

export const getWishlistCity = async (cityId) => {
  const { data } = await api.get(`/wishlist/city/${cityId}`);

  return data;
};
