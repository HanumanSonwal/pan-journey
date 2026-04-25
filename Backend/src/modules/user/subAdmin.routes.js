// import express from "express";
// import {
//   createSubAdminController,
//   deleteSubAdminController,
//   getAllUsersController,
//   getSingleSubAdminController,
//   updateSubAdminController,
// } from "./user.controller.js";

// import { protect } from "../../middleware/auth.middleware.js";
// import { checkPermission } from "../../middleware/checkPermission.js";
// import { validate } from "../../middleware/validate.middleware.js";

// import {
//   createSubAdminValidation,
//   updateSubAdminValidation,
// } from "./user.validation.js";

// const router = express.Router();

// // 🔐 CREATE SUB ADMIN
// router.post(
//   "/",
//   protect,
//   checkPermission("users", "write"),
//   validate(createSubAdminValidation),
//   createSubAdminController,
// );

// // 🔐 GET ALL SUB ADMINS
// router.get(
//   "/",
//   protect,
//   checkPermission("users", "read"),
//   getAllUsersController,
// );

// // 🔐 GET SINGLE SUB ADMIN
// router.get(
//   "/:id",
//   protect,
//   checkPermission("users", "read"),
//   getSingleSubAdminController,
// );

// // 🔐 UPDATE SUB ADMIN
// router.put(
//   "/:id",
//   protect,
//   checkPermission("users", "update"),
//   validate(updateSubAdminValidation),
//   updateSubAdminController,
// );

// // 🔐 DELETE SUB ADMIN
// router.delete(
//   "/:id",
//   protect,
//   checkPermission("users", "delete"),
//   deleteSubAdminController,
// );

// export default router;


import express from "express";
import {
  createStaffController,
  deleteUserController,
  getAllUsersController,
  getCustomersController,
  getSingleUserController,
  updateUserController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";
import { validate } from "../../middleware/validate.middleware.js";

import {
  createStaffValidation,
  updateUserValidation,
} from "./user.validation.js";

const router = express.Router();

//////////////////////////////////////////////////////////////
// STAFF (ADMIN DASHBOARD USERS)
//////////////////////////////////////////////////////////////

// 🔐 CREATE STAFF
router.post(
  "/staff",
  protect,
  checkPermission("users", "write"),
  validate(createStaffValidation),
  createStaffController
);

// 🔐 GET ALL USERS (admin + staff)
router.get(
  "/",
  protect,
  checkPermission("users", "read"),
  getAllUsersController
);

//////////////////////////////////////////////////////////////
// CUSTOMER (SEPARATE API)
//////////////////////////////////////////////////////////////

router.get(
  "/customers",
  protect,
  checkPermission("users", "read"),
  getCustomersController
);

//////////////////////////////////////////////////////////////
// COMMON USER APIs
//////////////////////////////////////////////////////////////

// 🔐 GET SINGLE USER
router.get(
  "/:id",
  protect,
  checkPermission("users", "read"),
  getSingleUserController
);

// 🔐 UPDATE USER
router.put(
  "/:id",
  protect,
  checkPermission("users", "update"),
  validate(updateUserValidation),
  updateUserController
);

// 🔐 DELETE USER
router.delete(
  "/:id",
  protect,
  checkPermission("users", "delete"),
  deleteUserController
);

export default router;