import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const supplierAPI = axios.create({
  baseURL: process.env.SUPPLIER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthHeader = () => ({
  UserId: process.env.SUPPLIER_USER,
  Password: process.env.SUPPLIER_PASS,
  Request_Id: Date.now().toString(),
  IP_Address: "192.168.29.157",
  IMEI_Number: "2232323232323",
});