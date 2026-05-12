import express from "express";
import { getHomeDestinationsController } from "./desitanation.controller.js";

const router = express.Router();

router.get("/destinations", getHomeDestinationsController);

export default router;