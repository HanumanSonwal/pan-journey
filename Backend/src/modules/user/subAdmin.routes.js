import express from "express";
import {
  createSubAdminController,
  deleteSubAdminController,
  getAllSubAdminsController,
  getSingleSubAdminController,
  updateSubAdminController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createSubAdminValidation,
  updateSubAdminValidation,
} from "./user.validation.js";

const router = express.Router();

// 🔐 CREATE SUB ADMIN
router.post(
  "/",
  protect,
  checkPermission("users", "write"),
  validate(createSubAdminValidation),
  createSubAdminController,
);

// 🔐 GET ALL SUB ADMINS
router.get(
  "/",
  protect,
  checkPermission("users", "read"),
  getAllSubAdminsController,
);

// 🔐 GET SINGLE SUB ADMIN
router.get(
  "/:id",
  protect,
  checkPermission("users", "read"),
  getSingleSubAdminController,
);

// 🔐 UPDATE SUB ADMIN
router.put(
  "/:id",
  protect,
  checkPermission("users", "update"),
  validate(updateSubAdminValidation),
  updateSubAdminController,
);

// 🔐 DELETE SUB ADMIN
router.delete(
  "/:id",
  protect,
  checkPermission("users", "delete"),
  deleteSubAdminController,
);

export default router;
