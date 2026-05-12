import express from "express";
import { supplierCitySearchController } from "../citysearch/supplierCity.controller.js";

const router = express.Router();

router.post("/destination-search", supplierCitySearchController);

export default router;