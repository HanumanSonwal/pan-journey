import express from "express";
import { protectCustomer } from "../../middleware/customerAuth.middleware.js";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getSingleContact,
  updateContact,
} from "./contact.controller.js";

const router = express.Router();

router.post("/create", protectCustomer, createContact);

router.get("/getAllContacts", protectCustomer, getAllContacts);

router.get("/getSingleContact/:id", protectCustomer, getSingleContact);

router.put("/updateContact/:id", protectCustomer, updateContact);

router.delete("/deleteContact/:id", protectCustomer, deleteContact);

export default router;
