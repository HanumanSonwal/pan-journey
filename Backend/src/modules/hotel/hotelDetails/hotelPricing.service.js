// hotelPricing.service.js

import { getCurrencyRate } from "../../currencyConverter/currency.service.js";
import Markup from "../../priceMarkup/markup/markup.model.js";
import { extractNormalizedCity } from "../../priceMarkup/markup/markup.service.js";
import { applyHotelPricing } from "../../priceMarkup/markup/pricing.service.js";
import getCountryTaxRule from "../../tax/countryTax.service.js";

const resolveMarkup = ({
  hotelId,
  cityName,
  stateName,
  countryCode,
  allMarkups,
}) => {
  const hotelMarkups = allMarkups.filter((m) => m.level === "hotel");
  const cityMarkups = allMarkups.filter((m) => m.level === "city");
  const stateMarkups = allMarkups.filter((m) => m.level === "state");
  const countryMarkups = allMarkups.filter((m) => m.level === "country");
  const worldwideMarkup = allMarkups.find((m) => m.level === "worldwide");

  // hotel
  const hotelMarkup = hotelMarkups.find(
    (m) => String(m.hotelId) === String(hotelId),
  );
  if (hotelMarkup) return hotelMarkup;
  console.log("hotelmarkup =", hotelMarkup);
  // city
  const normalizedCity = extractNormalizedCity(cityName);

  const cityMarkup = cityMarkups.find(
    (m) =>
      m.cityName?.trim().toLowerCase() === normalizedCity?.trim().toLowerCase(),
  );

  if (cityMarkup) return cityMarkup;

  console.log("incoming city =", normalizedCity);
  console.log(
    "db cities =",
    cityMarkups.map((m) => m.cityName),
  );
  console.log("matched cityMarkup =", cityMarkup);
 
  // state
  const stateMarkup = stateMarkups.find(
    (m) =>
      m.stateName?.trim().toLowerCase() === stateName?.trim().toLowerCase(),
  );
  if (stateMarkup) return stateMarkup;

  // country
  const countryMarkup = countryMarkups.find(
    (m) => m.countryCode?.toUpperCase() === countryCode?.toUpperCase(),
  );
  if (countryMarkup) return countryMarkup;

  if (worldwideMarkup) return worldwideMarkup;

  return null;
};

export const applyPricing = async (
  supplierData,
  hotelMeta,
  currency = "INR",
) => {
  try {
    const hotelId = supplierData.hotelId;
    const { cityName, stateName, countryCode } = hotelMeta;
    console.log("hotelMeta =>", hotelMeta);
    console.log("hotelId after destructure =>", hotelId);
    console.log("supplierData.hotelId =>", supplierData.hotelId);

    const allMarkups = await Markup.find({
      isActive: true,
    }).lean();

  

    const additionalTax = allMarkups.find((m) => m.level === "additional_tax");
    const conversionRate = await getCurrencyRate({
      from: "INR",
      to: currency || "INR",
    });
    const matchedMarkup = resolveMarkup({
      hotelId,
      cityName,
      stateName,
      countryCode,
      allMarkups,
    });

    const countryTax = await getCountryTaxRule({
      countryCode,
    });

    const rate = await getCurrencyRate({
      from: "INR",
      to: currency,
    });

    console.log("Currency Rate =", rate);
    supplierData?.supplierResponse?.RatePlanRecommendations?.forEach(
      (recommendation) => {
        // STEP 1 → currency conversion main amount
        const convertedMainAmount = Number(
          (recommendation.TotalAmount * conversionRate).toFixed(2),
        );

        // STEP 2 → pricing after conversion
        const pricedMain = applyHotelPricing({
          hotel: {
            price: convertedMainAmount,
          },
          markup: matchedMarkup,
         
          additionalTax,
          countryTax,
        });

        recommendation.OriginalTotalAmount = recommendation.TotalAmount;

        recommendation.TotalAmount = pricedMain.price;

        // STEP 3 → nested rate plans
        recommendation?.RatePlanDetails?.forEach((plan) => {
          const convertedPlanAmount = Number(
            (plan.TotalAmount * conversionRate).toFixed(2),
          );

          const pricedRate = applyHotelPricing({
            hotel: {
              price: convertedPlanAmount,
            },
            markup: matchedMarkup,
            additionalTax,
            countryTax,
          });

          plan.OriginalTotalAmount = plan.TotalAmount;

          plan.TotalAmount = pricedRate.price;
          
        });
      },
    );

    return supplierData;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
