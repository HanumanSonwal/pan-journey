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
  updateCMS,
} from "./cms.controller.js";

import { createCMSValidation, updateCMSValidation } from "./cms.validation.js";

const router = express.Router();

/*
 PUBLIC
*/

router.get("/page/:slug", getCMSBySlug);

router.get("/templates", getTemplates);
router.get("/entity/:entityType/:entityId", protect, getCMSByEntityController);

/*
 ADMIN
*/

router.post("/", protect, validate(createCMSValidation), createCMS);

router.get("/", protect, getAllCMS);

router.get("/:id", protect, getSingleCMS);

router.put("/:id", protect, validate(updateCMSValidation), updateCMS);

router.delete("/:id", protect, deleteCMS);

export default router;
