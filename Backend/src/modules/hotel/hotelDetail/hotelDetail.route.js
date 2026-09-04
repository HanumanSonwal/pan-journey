import express from "express";
import {
  getHotelDetail,
} from "./hotelDetail.controller.js";

const router = express.Router();

router.post(
  "/",
  getHotelDetail
);

export default router;