import express from "express";
import { getHotelRequeryByUserController } from "./requery.controller.js";

const router = express.Router();

router.get("/hotel/requery/:UserId", getHotelRequeryByUserController);

export default router;
