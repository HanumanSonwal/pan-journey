// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const supplierClient = axios.create({
//   baseURL: process.env.SUPPLIER_BASE_URL,
//   headers: {
//     "Content-Type": "application/json"
//   },
//   timeout: 30000
// });

// // 🔥 Common Auth Header Generator
// const getAuthHeader = () => {
//   return {
//     UserId: process.env.SUPPLIER_USER_ID,
//     Password: process.env.SUPPLIER_PASSWORD,
//     IP_Address: process.env.SUPPLIER_IP,
//     Request_Id: Date.now().toString() // unique id each request
//   };
// };

// // 🔥 Generic Supplier Request Function
// export const supplierRequest = async (endpoint, payload) => {
//   try {
//     const body = {
//       Auth_Header: getAuthHeader(),
//       ...payload
//     };

//     const { data } = await supplierClient.post(endpoint, body);

//     return data;
//   } catch (err) {
//     console.error("Supplier API Error:", err?.response?.data || err.message);
//     throw new Error("Supplier API Failed");
//   }
// };