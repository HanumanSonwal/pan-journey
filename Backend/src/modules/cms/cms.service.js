import ApiError from "../../utils/response/ApiError.js";
import { generateSlug } from "../../utils/slug/slugify.js";

import CMSPage from "./cms.model.js";
import { CMS_TEMPLATES } from "./cms.templates.js";

/*
CREATE
*/
export const createCMSPage = async (payload) => {
  const { entityType, entityId } = payload;

  // auto slug
  let slug = payload.slug;

  if (!slug) {
    // HOTEL
    if (payload.entityType === "hotel" && payload?.data?.hotelMeta?.hotelName) {
      slug = generateSlug(payload.data.hotelMeta.hotelName);
    }

    // HOTEL CITY
    else if (
      payload.entityType === "hotelCity" &&
      payload?.data?.cityMeta?.destination
    ) {
      slug = generateSlug(payload.data.cityMeta.destination.split(",")[0]);
    }

    // DEFAULT
    else {
      slug = generateSlug(payload.title);
    }
  }

  // slug duplicate check
  const existingSlug = await CMSPage.findOne({
    slug,
  });

  if (existingSlug) {
    throw new ApiError(400, "Slug already exists");
  }

  // entity duplicate
  if (entityId && entityType !== "static" && entityType !== "marketing") {
    const existingEntity = await CMSPage.findOne({
      entityType,
      entityId,
    });

    if (existingEntity) {
      throw new ApiError(400, "CMS page already exists for this entity");
    }
  }

  payload.slug = slug;

  const page = await CMSPage.create(payload);

  return page;
};

/*
GET ALL
*/
export const getAllCMSPages = async (query) => {
  const { page = 1, limit = 10, entityType, search } = query;

  const filter = {};

  if (entityType) {
    filter.entityType = entityType;
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    CMSPage.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),

    CMSPage.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page: Number(page),
    limit: Number(limit),
  };
};

/*
GET SINGLE
*/
export const getCMSPageById = async (id) => {
  const page = await CMSPage.findById(id);

  if (!page) {
    throw new ApiError(404, "CMS page not found");
  }

  return page;
};

/*
UPDATE
*/
export const updateCMSPage = async (id, payload) => {
  const page = await CMSPage.findById(id);

  if (!page) {
    throw new ApiError(404, "CMS page not found");
  }

  // regenerate slug if title changed
  if (payload.title && !payload.slug) {
    payload.slug = generateSlug(payload.title);
  }

  // slug duplicate check
  if (payload.slug && payload.slug !== page.slug) {
    const slugExists = await CMSPage.findOne({
      slug: payload.slug,
      _id: {
        $ne: id,
      },
    });

    if (slugExists) {
      throw new ApiError(400, "Slug already exists");
    }
  }

  Object.assign(page, payload);

  await page.save();

  return page;
};

/*
DELETE
*/
export const deleteCMSPage = async (id) => {
  const page = await CMSPage.findById(id);

  if (!page) {
    throw new ApiError(404, "CMS page not found");
  }

  await page.deleteOne();

  return true;
};

/*
GET BY SLUG
*/
export const getCMSPageBySlug = async (slug) => {
  console.log("CMS SLUG:", slug);

  const page = await CMSPage.findOne({
    slug,
    isPublished: true,
  });

  console.log("CMS PAGE:", page);

  if (!page) {
    throw new ApiError(404, "Page not found");
  }

  return page;
};

/*
GET TEMPLATES
*/

/*
GET BY ENTITY
*/
export const getCMSByEntity = async (entityType, entityId) => {
  const page = await CMSPage.findOne({
    entityType,
    entityId,
  });

  return page;
};
export const getCMSTemplates = async () => {
  return CMS_TEMPLATES;
};
