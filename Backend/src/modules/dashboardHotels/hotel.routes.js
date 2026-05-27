import express from "express";
import { hotelSearch } from "./hotel.controller.js";

const router = express.Router();

router.post("/dashboardHotelSearch", hotelSearch);

export default router;