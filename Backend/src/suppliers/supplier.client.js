// import mockData from "./supplier.mock.json" assert { type: "json" };

// export const fetchHotelsByCity = async (city) => {
//   console.log("📡 Fetching from SUPPLIER for city:", city);

//   // ❗ Abhi mock return
//   return mockData;

//   // FUTURE (real API)
//   // const res = await axios.post(SUPPLIER_URL, payload)
//   // return res.data
// };

import fs from "fs/promises";
import path from "path";

export const fetchHotelsByCity = async (city) => {
  console.log("📡 Calling SUPPLIER API for:", city);

  // fake delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // JSON read from file (best way)
  const filePath = path.resolve("src/suppliers/supplier.mock.json");
  const jsonData = await fs.readFile(filePath, "utf-8");

  return JSON.parse(jsonData);
};