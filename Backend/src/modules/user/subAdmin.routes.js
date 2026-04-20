import express from "express";
import {
  createSubAdminController,
  deleteSubAdminController,
  getAllSubAdminsController,
  getSingleSubAdminController,
  updateSubAdminController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createSubAdminValidation,
  updateSubAdminValidation,
} from "./user.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validate(createSubAdminValidation),
  createSubAdminController
);

router.get("/", protect, authorizeRoles("admin"), getAllSubAdminsController);

router.get("/:id", protect, authorizeRoles("admin"), getSingleSubAdminController);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validate(updateSubAdminValidation),
  updateSubAdminController
);

router.delete("/:id", protect, authorizeRoles("admin"), deleteSubAdminController);

export default router;