import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { checkPermission } from "../../middleware/checkPermission.js";
import * as hotel from "./hotel.controller.js";

const router = express.Router();

// CREATE
router.post(
  "/create",
  protect,
  checkPermission("hotel", "write"),
  hotel.createHotel
);

// READ
router.get(
  "/",
  protect,
  checkPermission("hotel", "read"),
  hotel.getHotels
);

// UPDATE
router.put(
  "/:id",
  protect,
  checkPermission("hotel", "update"),
  hotel.updateHotel
);

// DELETE
router.delete(
  "/:id",
  protect,
  checkPermission("hotel", "delete"),
  hotel.deleteHotel
);

export default router;