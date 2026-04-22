import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import permit from "../../middleware/checkPermission.js";
import * as hotel from "./hotelController.js";

const router = express.Router();

// CREATE HOTEL
router.post("/", protect, permit("create_hotel"), hotel.createHotel);

// READ HOTELS
router.get("/", protect, permit("read_hotel"), hotel.getHotels);

// UPDATE HOTEL
router.put("/:id", protect, permit("update_hotel"), hotel.updateHotel);

// DELETE HOTEL
router.delete("/:id", protect, permit("delete_hotel"), hotel.deleteHotel);

export default router;