import express from "express";
import {
  createStaffController,
  getAllUsersController,
  getCustomersController,
  getSingleUserController,
  updateUserController,
  updateUserStatusController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createStaffValidation,
  updateUserValidation,
} from "./user.validation.js";

const router = express.Router();

// 🔐 CREATE STAFF
router.post(
  "/staff",
  protect,
  checkPermission("users", "write"),
  validate(createStaffValidation),
  createStaffController,
);

router.get(
  "/",
  protect,
  checkPermission("users", "read"),
  getAllUsersController,
);

router.get(
  "/customers",
  protect,
  checkPermission("users", "read"),
  getCustomersController,
);

// 🔐 GET SINGLE USER
router.get(
  "/:id",
  protect,
  checkPermission("users", "read"),
  getSingleUserController,
);

// 🔐 UPDATE USER
router.put(
  "/:id",
  protect,
  checkPermission("users", "update"),
  validate(updateUserValidation),
  updateUserController,
);

router.patch(
  "/:id/status",
  protect,
  checkPermission("users", "update"),
  updateUserStatusController,
);

export default router;
