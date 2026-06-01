
// import axios from "axios";

// export const getCurrencyRate = async ({
//   from = "INR",
//   to = "USD",
// }) => {

//   try {

//     if (from === to) {
//       return 1;
//     }

//     const url =
//       `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`;

//     console.log("\n================================");
//     console.log("🌍 CURRENCY API CALL");
//     console.log("FROM:", from);
//     console.log("TO:", to);
//     console.log("URL:", url);
//     console.log("API KEY:",
//       process.env.EXCHANGE_RATE_API_KEY
//     );
//     console.log("================================\n");

//     const response = await axios.get(url);

//     console.log("\n================================");
//     console.log("💱 CURRENCY API RESPONSE");
//     console.log(
//       JSON.stringify(response.data, null, 2)
//     );
//     console.log("================================\n");

//     const rates =
//       response.data.conversion_rates;

//     console.log(
//       "✅ SELECTED RATE:",
//       rates[to]
//     );

//     return rates[to] || 1;

//   } catch (error) {

//     console.log("\n================================");
//     console.log("❌ CURRENCY API ERROR");

//     console.log(
//       "MESSAGE:",
//       error.message
//     );

//     console.log(
//       "STATUS:",
//       error?.response?.status
//     );

//     console.log(
//       "DATA:",
//       error?.response?.data
//     );

//     console.log("================================\n");

//     return 1;
//   }
// };

import axios from "axios";

import CurrencyRate from "./currencyRate.model.js";

export const getCurrencyRate =
async ({
  from = "INR",
  to = "USD",
}) => {

  try {

    if (from === to) {
      return 1;
    }

    /* =========================================
       CHECK DB CACHE
    ========================================= */

    const existingRate =
      await CurrencyRate.findOne({
        baseCurrency: from,
      });

    const now = new Date();

    // 6 hour cache
    const sixHours =
      6 * 60 * 60 * 1000;

    const isValid =
      existingRate &&
      now - existingRate.updatedAt <
        sixHours;

    /* =========================================
       USE CACHED RATE
    ========================================= */

    if (
      isValid &&
      existingRate.rates?.[to]
    ) {

      console.log(
        "⚡ USING CACHED RATE"
      );

      return existingRate.rates[to];
    }

    /* =========================================
       FETCH FROM API
    ========================================= */

    console.log(
      "🌍 FETCHING NEW RATES"
    );

    const url =
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`;

    const response =
      await axios.get(url);

    const rates =
      response.data.conversion_rates;

    /* =========================================
       SAVE TO DB
    ========================================= */

    await CurrencyRate.findOneAndUpdate(
      {
        baseCurrency: from,
      },
      {
        baseCurrency: from,
        rates,
        lastUpdated: now,
      },
      {
        upsert: true,
        new: true,
      }
    );

    console.log(
      "💾 CURRENCY RATES SAVED"
    );

    return rates[to] || 1;

  } catch (error) {

    console.log(
      "❌ Currency Error:",
      error.message
    );

    return 1;
  }
};