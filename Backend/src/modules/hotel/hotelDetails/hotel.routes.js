import express from "express";
import { getHotelDetails } from "./hotelDetails.controller.js";

const router = express.Router();

router.post("/Hoteldetails", getHotelDetails);

export default router;