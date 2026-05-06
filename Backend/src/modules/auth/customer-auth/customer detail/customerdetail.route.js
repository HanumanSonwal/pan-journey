import express from "express";
import {
  getCustomerDocumentdetail,
  updateCustomerDocumentDetail,
} from "./customerdetail.controller.js";

import { protectCustomer } from "../../../../middleware/customerAuth.middleware.js";

const router = express.Router();


router.get("/profile/details", protectCustomer, getCustomerDocumentdetail);

router.put("/profile/details", protectCustomer, updateCustomerDocumentDetail);

export default router;