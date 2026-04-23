import express from "express";

import {
  getAllCustomersController,
  getSingleCustomerController,
  deleteCustomerController,
} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";

const router = express.Router();

//////////////////////////////////////////////////////
// CUSTOMER ROUTES (RBAC CONTROLLED)
//////////////////////////////////////////////////////

// GET ALL CUSTOMERS
router.get(
  "/",
  protect,
  checkPermission("users", "read"),
  getAllCustomersController
);

// GET SINGLE CUSTOMER
router.get(
  "/:id",
  protect,
  checkPermission("users", "read"),
  getSingleCustomerController
);

// DELETE CUSTOMER
router.delete(
  "/:id",
  protect,
  checkPermission("users", "delete"),
  deleteCustomerController
);

export default router;