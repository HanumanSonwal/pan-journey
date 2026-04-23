// import express from "express";
// import {
//   createSubAdminController,
//   deleteSubAdminController,
//   getAllSubAdminsController,
//   getSingleSubAdminController,
//   updateSubAdminController,
// } from "./user.controller.js";

// import { protect } from "../../middleware/auth.middleware.js";
// import { authorizeRoles } from "../../middleware/role.middleware.js";
// import { validate } from "../../middleware/validate.middleware.js";
// import {
//   createSubAdminValidation,
//   updateSubAdminValidation,
// } from "./user.validation.js";

// const router = express.Router();

// router.post(
//   "/",
//   protect,
//   authorizeRoles("admin"),
//   validate(createSubAdminValidation),
//   createSubAdminController
// );

// router.get("/", protect, authorizeRoles("admin"), getAllSubAdminsController);

// router.get("/:id", protect, authorizeRoles("admin"), getSingleSubAdminController);

// router.put(
//   "/:id",
//   protect,
//   authorizeRoles("admin"),
//   validate(updateSubAdminValidation),
//   updateSubAdminController
// );

// router.delete("/:id", protect, authorizeRoles("admin"), deleteSubAdminController);

// export default router;

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
  createSubAdminController
);

// 🔐 GET ALL SUB ADMINS
router.get(
  "/",
  protect,
  checkPermission("users", "read"),
  getAllSubAdminsController
);

// 🔐 GET SINGLE SUB ADMIN
router.get(
  "/:id",
  protect,
  checkPermission("users", "read"),
  getSingleSubAdminController
);

// 🔐 UPDATE SUB ADMIN
router.put(
  "/:id",
  protect,
  checkPermission("users", "update"),
  validate(updateSubAdminValidation),
  updateSubAdminController
);

// 🔐 DELETE SUB ADMIN
router.delete(
  "/:id",
  protect,
  checkPermission("users", "delete"),
  deleteSubAdminController
);

export default router;