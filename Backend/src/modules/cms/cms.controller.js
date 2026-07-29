import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/response/ApiResponse.js";

import {
  createCMSPage,
  deleteCMSPage,
  getAllCMSPages,
  getCMSByEntity,
  getCMSPageById,
  getCMSPageBySlug,
  getCMSTemplates,
  updateCMSPage,
  previewCMSSlug,
} from "./cms.service.js";

export const createCMS = asyncHandler(async (req, res) => {
  const data = await createCMSPage(req.body);
  sendSuccess(res, "CMS page created successfully", data);
});
export const getAllCMS = asyncHandler(async (req, res) => {
  const data = await getAllCMSPages(req.query);
  sendSuccess(res, "CMS pages fetched successfully", data);
});

export const getSingleCMS = asyncHandler(async (req, res) => {
  const data = await getCMSPageById(req.params.id);
  sendSuccess(res, "CMS page fetched successfully", data);
});

export const updateCMS = asyncHandler(async (req, res) => {
  const data = await updateCMSPage(req.params.id, req.body);
  sendSuccess(res, "CMS page updated successfully", data);
});

export const deleteCMS = asyncHandler(async (req, res) => {
  await deleteCMSPage(req.params.id);
  sendSuccess(res, "CMS page deleted successfully");
});

export const previewSlug = asyncHandler(async (req, res) => {
  const data = await previewCMSSlug(req.body);

  sendSuccess(res, "Slug preview generated successfully", data);
});

export const getCMSBySlug = asyncHandler(async (req, res) => {
  const preview = req.query.preview === "true";
  const data = await getCMSPageBySlug(req.params.slug, preview);
  sendSuccess(res, "CMS page fetched successfully", data);
});

export const getTemplates = asyncHandler(async (req, res) => {
  const data = await getCMSTemplates();
  sendSuccess(res, "Templates fetched successfully", data);
});

export const getCMSByEntityController = asyncHandler(async (req, res) => {
  const { entityType, entityId } = req.params;
  const data = await getCMSByEntity(entityType, entityId);
  sendSuccess(res, "CMS entity fetched successfully", data);
});
