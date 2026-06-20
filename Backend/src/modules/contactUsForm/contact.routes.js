import express from "express";
import {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteContact,
} from "./contact.controller.js";
import { protectCustomer } from "../../middleware/customerAuth.middleware.js"

const router = express.Router();

router.post("/create",protectCustomer,createContact);

router.get("/getAllContacts",protectCustomer, getAllContacts);

router.get("/getSingleContact/:id", protectCustomer,getSingleContact);

router.put("/updateContact/:id",protectCustomer, updateContact);

router.delete("/deleteContact/:id", protectCustomer,deleteContact);

export default router;