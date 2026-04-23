
import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
 import permit from "../../middleware/permit.middleware.js";
import * as hotel from "./hotel.controller.js";
import { PERMISSION } from "../../utils/permission.util.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  protect,
  permit(PERMISSION("hotel", "create")),
  hotel.createHotel
);

// READ
router.get(
  "/",
  protect,
  permit(PERMISSION("hotel", "read")),
  hotel.getHotels
);

// UPDATE
router.put(
  "/:id",
  protect,
  permit(PERMISSION("hotel", "update")),
  hotel.updateHotel
);

// DELETE
router.delete(
  "/:id",
  protect,
  permit(PERMISSION("hotel", "delete")),
  hotel.deleteHotel
);

export default router;