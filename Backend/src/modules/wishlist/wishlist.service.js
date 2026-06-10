import Wishlist from "./wishlist.model.js";

export const toggleWishlistService = async (userId, payload) => {
  const existing = await Wishlist.findOne({
    userId,
    hotelId: payload.hotelId,
  });

  if (existing) {
    await existing.deleteOne();

    return {
      wishlisted: false,
    };
  }

  await Wishlist.create({
    userId,
    ...payload,
  });

  return {
    wishlisted: true,
  };
};

export const getWishlistService = async (userId) => {
  return Wishlist.aggregate([
    {
      $match: {
        userId,
      },
    },

    {
      $sort: {
        createdAt: -1,
      },
    },

    {
      $group: {
        _id: "$cityId",

        cityId: {
          $first: "$cityId",
        },

        cityName: {
          $first: "$cityName",
        },

        coverImage: {
          $first: "$hotelImage",
        },

        hotelCount: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        hotelCount: -1,
      },
    },
  ]);
};

export const getWishlistCityService = async (userId, cityId) => {
  return Wishlist.find({
    userId,
    cityId,
  }).sort({
    createdAt: -1,
  });
};

export const checkWishlistService = async (userId, hotelId) => {
  const exists = await Wishlist.exists({
    userId,
    hotelId,
  });

  return {
    isWishlisted: !!exists,
  };
};
export const getWishlistHotelIdsService = async (userId) => {
  const items = await Wishlist.find({ userId }, { hotelId: 1, _id: 0 });

  return items.map((item) => item.hotelId);
};
