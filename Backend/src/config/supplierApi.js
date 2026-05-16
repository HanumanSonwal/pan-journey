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
  AuthHeader: {
   "UserId": "panjourneyuat",
    "Password": "01ED6B7F54BCF0BDB8F6C910974377AAB7D52AC2",
    "RequestId": "1778492918224",
    "IPAddress": "192.168.29.157"
  },
});

//  export const getAuthHeader = () => ({
//   AuthHeader: {
//     UserId: process.env.SUPPLIER_USER,
//         Password: process.env.SUPPLIER_PASS,
//         RequestId: Date.now().toString(),
//         IPAddress: process.env.SUPPLIER_IP,
// }});