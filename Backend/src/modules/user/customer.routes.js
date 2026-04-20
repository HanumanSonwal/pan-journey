import express from "express";
import {
  deleteCustomerController,
  getAllCustomersController,
  getSingleCustomerController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin", "sub-admin"),
  getAllCustomersController
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "sub-admin"),
  getSingleCustomerController
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "sub-admin"),
  deleteCustomerController
);

export default router;