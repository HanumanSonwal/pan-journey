import express from "express";
import {
  createContact,
  getAllContacts,
  getSingleContact,
  updateContact,
  deleteContact,
} from "./contact.controller.js";

const router = express.Router();

router.post("/create", createContact);

router.get("/getAllContacts", getAllContacts);

router.get("/getSingleContact/:id", getSingleContact);

router.put("/updateContact/:id", updateContact);

router.delete("/deleteContact/:id", deleteContact);

export default router;