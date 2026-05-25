import express from "express";

import { tempBooking }
from "./tempBooking.controller.js";

const router = express.Router();

router.post( "/temp-booking",tempBooking);

export default router;