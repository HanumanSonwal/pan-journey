import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const supplierAPI = axios.create({
  baseURL: process.env.SUPPLIER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});