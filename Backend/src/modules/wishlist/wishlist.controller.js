import { asyncHandler } from "../../middleware/asyncHandler.js";

import { sendSuccess } from "../../utils/response/ApiResponse.js";

import {
  checkWishlistService,
  getWishlistCityService,
  getWishlistHotelIdsService,
  getWishlistService,
  toggleWishlistService,
} from "./wishlist.service.js";

export const toggleWishlist = asyncHandler(async (req, res) => {
  const data = await toggleWishlistService(req.user._id, req.body);

  sendSuccess(res, "Wishlist updated", data);
});

export const getWishlist = asyncHandler(async (req, res) => {
  const data = await getWishlistService(req.user._id);

  sendSuccess(res, "Wishlist fetched", data);
});

export const getWishlistCity = asyncHandler(async (req, res) => {
  const data = await getWishlistCityService(req.user._id, req.params.cityId);

  sendSuccess(res, "Wishlist city fetched", data);
});

export const checkWishlist = asyncHandler(async (req, res) => {
  const data = await checkWishlistService(req.user._id, req.params.hotelId);

  sendSuccess(res, "Wishlist status", data);
});
export const getWishlistHotelIds = asyncHandler(async (req, res) => {
  const data = await getWishlistHotelIdsService(req.user._id);

  sendSuccess(res, "Wishlist ids fetched", data);
});
