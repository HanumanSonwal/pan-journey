import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
  createPermission,
  getPermissions,
  deletePermission,
} from "./permission.controller.js";

const router = express.Router();

router.post("/",  createPermission);
router.get("/",  getPermissions);
router.delete("/:id",  deletePermission);

export default router;