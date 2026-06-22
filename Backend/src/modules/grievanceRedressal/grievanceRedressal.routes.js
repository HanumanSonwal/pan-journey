import express from "express";
import {
  createGrievance,
  getAllGrievance,
  getSingleGrievance,
  updateGrievance,
  deleteGrievance,
} from "./grievanceRedressal.controller.js";

import { protectCustomer } from "../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.post(
  "/createGrievance",
  protectCustomer,
  createGrievance
);

router.get(
  "/getAllGrievance",
  protectCustomer,
  getAllGrievance
);

router.get(
  "/getSingleGrievance/:id",
  protectCustomer,
  getSingleGrievance
);

router.put(
  "/updateGrievance/:id",
  protectCustomer,
  updateGrievance
);

router.delete(
  "/:id",
  protectCustomer,
  deleteGrievance
);

export default router;