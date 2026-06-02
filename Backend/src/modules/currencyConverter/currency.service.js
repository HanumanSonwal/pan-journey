
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