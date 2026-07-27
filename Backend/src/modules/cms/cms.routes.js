import express from "express";

import { protect } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createCMS,
  deleteCMS,
  getAllCMS,
  getCMSByEntityController,
  getCMSBySlug,
  getSingleCMS,
  getTemplates,
  previewSlug,
  updateCMS,
} from "./cms.controller.js";

import { createCMSValidation, updateCMSValidation } from "./cms.validation.js";

const router = express.Router();

/*
=================================
PUBLIC
=================================
*/

/*
GET CMS BY SLUG
*/
router.get("/page/:slug", getCMSBySlug);

/*
PUBLIC CMS LIST
SITEMAP
*/
router.get("/public/pages", getAllCMS);

/*
CMS TEMPLATES
*/
router.get("/templates", getTemplates);

/*
ENTITY CMS
PROTECTED
*/
router.get("/entity/:entityType/:entityId", protect, getCMSByEntityController);

/*
=================================
ADMIN
=================================
*/

router.post("/preview-slug", protect, previewSlug);

/*
CREATE
*/
router.post("/", protect, validate(createCMSValidation), createCMS);

/*
GET ALL
ADMIN
*/
router.get("/", protect, getAllCMS);

/*
GET SINGLE
*/
router.get("/:id", protect, getSingleCMS);

/*
UPDATE
*/
router.put("/:id", protect, validate(updateCMSValidation), updateCMS);

/*
DELETE
*/
router.delete("/:id", protect, deleteCMS);

export default router;
