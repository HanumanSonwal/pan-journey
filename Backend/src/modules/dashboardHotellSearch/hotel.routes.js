import express from "express";
import { hotelSearchController } from "./searchcontoroller.js";

const router = express.Router();

router.post("/dashboardHotelSearch", hotelSearchController);

export default router;
