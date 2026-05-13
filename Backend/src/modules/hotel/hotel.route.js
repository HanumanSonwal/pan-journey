import express from "express";
import { hotelSearchController } from "./hotelContoller.js";

const router = express.Router();

router.post("/search", hotelSearchController);

export default router;