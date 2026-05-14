import express from "express";
import { hotelSearchController } from "./hotelContoller.js";
import { getHotelDetails } from "./hotelDetails/hotelDetails.controller.js";

const router = express.Router();

router.post("/search", hotelSearchController);
router.post("/hotel-details", getHotelDetails);

export default router;