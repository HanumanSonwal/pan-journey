import express from "express";
import {
  createMarkup,
  getAllMarkups,
  updateMarkup,
  deleteMarkup,
} from "./markup.controller.js";

const router = express.Router();

router.post("/createMarkup", createMarkup);
router.get("/getAllMarkups", getAllMarkups);
router.put("/:id", updateMarkup);
router.delete("/:id", deleteMarkup);

export default router;