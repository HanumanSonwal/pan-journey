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

  if (!payload.hotelName) {
    throw new Error("Hotel name is required");
  }
  if (!payload.cityId) {
    throw new Error("City id is required");
  }
  let normalizedCity = payload.normalizedCity;
  if (!normalizedCity) {
    const cityParts = (payload.cityName || "").split(",").map((v) => v.trim());
    normalizedCity = cityParts[0] || "";
  }
  const facilities = [...new Set(payload.facilities || [])];

  await Wishlist.create({
    userId,
    hotelId: payload.hotelId,
    hotelName: payload.hotelName,
    hotelSlug: payload.hotelSlug,
    hotelImage: payload.hotelImage,
    cityId: payload.cityId,
    cityName: payload.cityName,
    normalizedCity,
    stateName: payload.stateName || "",
    countryCode: payload.countryCode || "",
    countryName: payload.countryName || "",
    address: payload.address || "",
    starRating: Number(payload.starRating || 0),
    checkInDate: payload.CheckInDate || "",
    checkOutDate: payload.CheckOutDate || "",
    roomCount: Number(payload.RoomCount || 1),
    facilities,
    freeCancellation: payload.freeCancellation || false,
    savedPrice: Number(payload.savedPrice || 0),
    savedTax: Number(payload.savedTax || 0),
    supplier: payload.supplier || "TBO",
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
        _id: {
          city: "$normalizedCity",
          country: "$countryCode",
        },

        normalizedCity: {
          $first: "$normalizedCity",
        },

        stateName: {
          $first: "$stateName",
        },

        countryCode: {
          $first: "$countryCode",
        },

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
  const selected = await Wishlist.findOne({
    userId,
    cityId,
  }).lean();
  if (!selected) {
    return [];
  }
  return Wishlist.find({
    userId,
    normalizedCity: selected.normalizedCity,
    countryCode: selected.countryCode,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
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
  const items = await Wishlist.find(
    { userId },
    {
      hotelId: 1,
      _id: 0,
    },
  ).lean();

  return items.map((item) => item.hotelId);
};
