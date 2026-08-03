import HomeContent from "./homeContent.model.js";

import {
  HOME_CONTENT_SECTION,
  SINGLETON_SECTIONS,
} from "./homeContent.constants.js";

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createHomeContent = async (data) => {
  /*
   * Singleton Sections
   * banner
   * topRatedHotels
   * popularDestinations
   */

  if (SINGLETON_SECTIONS.includes(data.sectionType)) {
    const existing = await HomeContent.findOne({
      sectionType: data.sectionType,
      isActive: true,
    });

    if (existing) {
      throw new Error(
        `${data.sectionType} already exists. Please update the existing one.`,
      );
    }
  }

  /*
   * Vibe Category Duplicate Check
   */

  if (data.sectionType === HOME_CONTENT_SECTION.VIBE) {
    const existingCategory = await HomeContent.findOne({
      sectionType: HOME_CONTENT_SECTION.VIBE,
      category: data.category,
      isActive: true,
    });

    if (existingCategory) {
      throw new Error(`Vibe category "${data.category}" already exists.`);
    }
  }

  return await HomeContent.create(data);
};

/*
|--------------------------------------------------------------------------
| WEBSITE
|--------------------------------------------------------------------------
*/

// export const getHomeContent = async () => {
//   const data = await HomeContent.find({
//     isActive: true,
//   }).lean();

//   const response = {
//     banner: [],
//     placesAsPerYourVibe: [],
//     topRatedHotels: [],
//     popularDestinations: [],
//   };

//   data.forEach((item) => {
//     switch (item.sectionType) {
//       case HOME_CONTENT_SECTION.BANNER:
//         response.banner.push(item);
//         break;

//       case HOME_CONTENT_SECTION.VIBE:
//         response.placesAsPerYourVibe.push(item);
//         break;

//       case HOME_CONTENT_SECTION.TOP_RATED_HOTELS:
//         response.topRatedHotels.push(item);
//         break;

//       case HOME_CONTENT_SECTION.POPULAR_DESTINATIONS:
//         response.popularDestinations.push(item);
//         break;

//       default:
//         break;
//     }
//   });

//   return response;
// };

export const getHomeContent = async () => {
  const data = await HomeContent.find({
    isActive: true,
  })
    .sort({ order: 1 })
    .lean();

  const response = {
    banner: null,

    placesAsPerYourVibe: {
      title: "Places As Per Your Vibe",
      sectionType: HOME_CONTENT_SECTION.VIBE,
      categories: [],
    },

    topRatedHotels: {
      title: "Top Rated Hotels",
      sectionType: HOME_CONTENT_SECTION.TOP_RATED_HOTELS,
      items: [],
    },

    popularDestinations: {
      title: "Popular Destinations",
      sectionType: HOME_CONTENT_SECTION.POPULAR_DESTINATIONS,
      items: [],
    },
  };

  data.forEach((item) => {
    switch (item.sectionType) {
      case HOME_CONTENT_SECTION.BANNER:
        response.banner = item;
        break;

      case HOME_CONTENT_SECTION.VIBE:
        response.placesAsPerYourVibe.categories.push({
          _id: item._id,
          category: item.category,
          items: item.items,
          isActive: item.isActive,
        });
        break;

      case HOME_CONTENT_SECTION.TOP_RATED_HOTELS:
        response.topRatedHotels.items.push(...item.items);
        break;

      case HOME_CONTENT_SECTION.POPULAR_DESTINATIONS:
        response.popularDestinations.items.push(...item.items);
        break;

      default:
        break;
    }
  });

  return response;
};

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

export const getAdminHomeContent = async () => {
  const data = await HomeContent.find({
    isActive: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .lean();

  return {
    banner: data.filter(
      (item) => item.sectionType === HOME_CONTENT_SECTION.BANNER,
    ),

    placesAsPerYourVibe: data.filter(
      (item) => item.sectionType === HOME_CONTENT_SECTION.VIBE,
    ),

    topRatedHotels: data.filter(
      (item) => item.sectionType === HOME_CONTENT_SECTION.TOP_RATED_HOTELS,
    ),

    popularDestinations: data.filter(
      (item) => item.sectionType === HOME_CONTENT_SECTION.POPULAR_DESTINATIONS,
    ),
  };
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateHomeContent = async (id, data) => {
  const existing = await HomeContent.findById(id);

  if (!existing) {
    throw new Error("Home content not found.");
  }

  /*
   * Prevent duplicate vibe category
   */

  if (
    existing.sectionType === HOME_CONTENT_SECTION.VIBE &&
    data.category &&
    data.category !== existing.category
  ) {
    const duplicate = await HomeContent.findOne({
      _id: {
        $ne: id,
      },
      sectionType: HOME_CONTENT_SECTION.VIBE,
      category: data.category,
      isActive: true,
    });

    if (duplicate) {
      throw new Error(`Vibe category "${data.category}" already exists.`);
    }
  }

  return await HomeContent.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteHomeContent = async (id) => {
  const existing = await HomeContent.findById(id);

  if (!existing) {
    throw new Error("Home content not found.");
  }

  return await HomeContent.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
    },
  );
};
