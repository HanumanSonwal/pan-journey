import express from "express";
import {
  getHotelRequeryByUserController,
} from "./requery.controller.js";

const router = express.Router();

router.get(
  "/hotel/requery/:User__id",
  getHotelRequeryByUserController
);

export default router;