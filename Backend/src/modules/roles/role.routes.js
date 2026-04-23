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
  checkPermission("role", "write"),
  createRole
);

router.get(
  "/all",
  protect,
  checkPermission("role", "read"),
  getRoles
);

router.get(
  "/:id",
  protect,
  checkPermission("role", "read"),
  getRoleById
);

router.put(
  "/:id",
  protect,
  checkPermission("role", "update"),
  updateRole
);

router.delete(
  "/:id",
  protect,
  checkPermission("role", "delete"),
  deleteRole
);

export default router;