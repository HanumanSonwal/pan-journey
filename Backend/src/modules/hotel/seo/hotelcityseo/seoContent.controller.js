// controllers/seoContent.controller.js

import SEOContent from "../hotelcityseo/seoContent.model.js";
import {
  sendSuccess,
  sendError,
} from "../../../../utils/response/ApiResponse.js";


// 🔥 slug generator
const generateSlug = (text) => {
  return text
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};


// ================= CREATE =================
export const createSEOContent = async (req, res) => {
  try {

    // 🔥 check duplicate entityId
    const existingEntity = await SEOContent.findOne({
      entityId: req.body.entityId,
    });

    if (existingEntity) {
      return sendError(
        res,
        "SEO Content already exists with this Hotel Or City Name",
        400
      );
    }

    // 🔥 generate slug
    const slug = generateSlug(req.body.name);

    // 🔥 create seo content
    const seoContent = await SEOContent.create({
      ...req.body,
      slug,
    });

    return sendSuccess(
      res,
      "SEO Content Created",
      seoContent,
      null,
      201
    );

  } catch (error) {
    return sendError(
      res,
      error.message || "Failed to create SEO Content",
      500
    );
  }
};


// ================= GET ALL =================
export const getAllSEOContents = async (req, res) => {
  try {

    const { type, slug } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (slug) {
      filter.slug = {
        $regex: slug,
        $options: "i",
      };
    }

    const data = await SEOContent.find(filter).sort({
      createdAt: -1,
    });

    return sendSuccess(
      res,
      "SEO Contents fetched successfully",
      data,
      {
        count: data.length,
      }
    );

  } catch (error) {
    return sendError(
      res,
      error.message || "Failed to fetch SEO Contents",
      500
    );
  }
};


// ================= GET SINGLE =================
export const getSingleSEOContent = async (req, res) => {
  try {

    const data = await SEOContent.findById(req.params.id);

    if (!data) {
      return sendError(
        res,
        "SEO Content Not Found",
        404
      );
    }

    return sendSuccess(
      res,
      "SEO Content fetched successfully",
      data
    );

  } catch (error) {
    return sendError(
      res,
      error.message || "Failed to fetch SEO Content",
      500
    );
  }
};


// ================= UPDATE =================
export const updateSEOContent = async (req, res) => {
  try {

    // 🔥 regenerate slug if name updated
    if (req.body.name) {
      req.body.slug = generateSlug(req.body.name);
    }

    const updated = await SEOContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return sendError(
        res,
        "SEO Content Not Found",
        404
      );
    }

    return sendSuccess(
      res,
      "SEO Content Updated",
      updated
    );

  } catch (error) {
    return sendError(
      res,
      error.message || "Failed to update SEO Content",
      500
    );
  }
};


// ================= DELETE =================
export const deleteSEOContent = async (req, res) => {
  try {

    const deleted = await SEOContent.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return sendError(
        res,
        "SEO Content Not Found",
        404
      );
    }

    return sendSuccess(
      res,
      "SEO Content Deleted"
    );

  } catch (error) {
    return sendError(
      res,
      error.message || "Failed to delete SEO Content",
      500
    );
  }
};