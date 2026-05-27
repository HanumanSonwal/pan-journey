import express from "express";

import {
  createSEOContent,
  deleteSEOContent,
  getAllSEOContents,
  getSingleSEOContent,
  updateSEOContent,
} from "../hotelcityseo/seoContent.controller.js";

const router = express.Router();

// CREATE
router.post("/", createSEOContent);

// GET ALL
router.get("/", getAllSEOContents);

// GET SINGLE
router.get("/:id", getSingleSEOContent);

// UPDATE
router.put("/:id", updateSEOContent);

// DELETE
router.delete("/:id", deleteSEOContent);

export default router;
