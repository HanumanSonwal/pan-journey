// import { detectCurrencyFromIP } from "../modules/currencyConverter/currency.detect.js";
// export const currencyMiddleware = (req, res, next) => {
//   let currencySource = "header";

//   // 1. Header se currency
//   let currency = req.headers["currency"];

//   // 2. Body se (backward compatibility)
//   if (!currency && req.body?.currency) {
//     currency = req.body.currency;
//     currencySource = "body";
//   }

//   // 3. IP se detect
//   if (!currency) {
//     currency = detectCurrencyFromIP(req);

//     if (currency) {
//       currencySource = "ip";
//     }
//   }

//   // 4. Final fallback
//   if (!currency) {
//     currency = "INR";
//     currencySource = "default";
//   }

//   req.currency = currency;
//   req.currencySource = currencySource;
//   console.log("Header:", req.headers.currency);
// console.log("IP Currency:", detectCurrencyFromIP(req));
// console.log("Final Currency:", req.currency);
// console.log("Source:", req.currencySource);

//   next();
// };

import { detectCurrencyFromIP } from "../modules/currencyConverter/currency.detect.js";

export const currencyMiddleware = (req, res, next) => {
  let currency = req.headers["currency"];
  let currencySource = "header";

  // Header se currency nahi mili -> IP se detect
  if (!currency) {
    currency = detectCurrencyFromIP(req);
    currencySource = "ip";
  }

  // Final fallback
  if (!currency) {
    currency = "INR";
    currencySource = "default";
  }

  req.currency = currency.toUpperCase();
  req.currencySource = currencySource;

  console.log("Currency Header:", req.headers["currency"]);
  console.log("Detected Currency:", req.currency);
  console.log("Currency Source:", req.currencySource);

  next();
};