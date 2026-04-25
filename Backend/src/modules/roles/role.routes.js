import express from "express";
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "./role.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";

const router = express.Router();

// 🔹 Role Routes
router.post(
  "/create",
  protect,
checkPermission("roles", "write"),
  createRole
);

router.get(
  "/all",
  protect,
  checkPermission("roles", "read"),
  getRoles
);

router.get(
  "/:id",
  protect,
  checkPermission("roles", "read"),
  getRoleById
);

router.put(
  "/:id",
  protect,
  checkPermission("roles", "update"),
  updateRole
);

router.delete(
  "/:id",
  protect,
  checkPermission("roles", "delete"),
  deleteRole
);

export default router;