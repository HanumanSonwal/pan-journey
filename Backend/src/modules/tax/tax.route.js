import express from "express";

import {
  createTaxRule,
  getAllTaxRules,
  updateTaxRule,
  deleteTaxRule,
  toggleTaxStatus,
} from "./tax.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", createTaxRule);

router.get("/all", getAllTaxRules);

router.put("/update/:id", updateTaxRule);

router.patch("/status/:id", toggleTaxStatus);

router.delete("/delete/:id", deleteTaxRule);

export default router;