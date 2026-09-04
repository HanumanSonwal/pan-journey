import express from "express";

import {
  getHotelDetailsController,
} from "./hotelDetails.controller.js";

const router = express.Router();


// POST /hotel/details

router.post(
  "/details",
  getHotelDetailsController
);


export default router;