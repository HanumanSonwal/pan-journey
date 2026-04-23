import express from "express";
import { updateRole } from "./role.controller.js";
import { checkPermission } from "../../middleware/checkPermission.js";
const router = express.Router();

import {
  createRole,
  getRoles,
  deleteRole,
} from "./role.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

// routes
// router.post("/", protect, createRole);
// router.get("/", protect, getRoles);
// router.delete("/:id", protect, deleteRole);
// router.put("/:id", protect, updateRole);

export default router;

router.post(
  "/",
  protect,
  checkPermission("role", "write"),
  createRole
);
router.get(
  "/",
  protect,
  checkPermission("role", "read"),
  getRoles
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