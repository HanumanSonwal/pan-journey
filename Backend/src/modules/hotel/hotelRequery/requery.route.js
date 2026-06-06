// import express from "express";
// import { getHotelRequeryByUserController } from "./requery.controller.js";

// const router = express.Router();

// router.get("/hotel/requery/:UserId", getHotelRequeryByUserController);

// export default router;


import express from "express";
import { getHotelRequeryByUserController } from "./requery.controller.js";
import { protectCustomer } from "../../../middleware/customerAuth.middleware.js";

const router = express.Router();

router.get(
   "/hotel/requery",
  protectCustomer,
  getHotelRequeryByUserController
);

export default router;