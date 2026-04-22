import express from "express";

const router = express.Router();

import {
  createRole,
  getRoles,
  deleteRole,
} from "./role.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

// routes
router.post("/", protect, createRole);
router.get("/", protect, getRoles);
router.delete("/:id", protect, deleteRole);

export default router;