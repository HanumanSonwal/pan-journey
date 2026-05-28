

// // hotelPricing.service.js

import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

export const applyPricing = async (supplierData, hotelMeta) => {
  try {

    const { hotelId, cityName, stateName, countryCode } = hotelMeta;

    const markupDoc = await getMarkup({
      hotelId,
      cityName,
      stateName,
      countryCode,
    });

    const serviceTaxDoc = await getServiceTax();

    const markupValue = markupDoc?.markupValue || 0;
    const markupType = markupDoc?.markupType || "flat";

    const serviceTax = serviceTaxDoc?.markupValue || 0;

    const applyAmountMarkup = (amount) => {

      amount = Number(amount || 0);

      let updated = amount;

      // ✅ Markup
      if (markupType === "percentage") {

        updated += (amount * markupValue) / 100;

      } else {

        updated += markupValue;
      }

      // ✅ Service Tax
      updated += (updated * serviceTax) / 100;

      return Number(updated.toFixed(2));
    };

    // ✅ MAIN FIX
    supplierData?.supplierResponse?.RatePlanRecommendations?.forEach(
      (recommendation) => {

        // Original store
        recommendation.OriginalBasicAmount =
          recommendation.BasicAmount;

        recommendation.OriginalTotalAmount =
          recommendation.TotalAmount;

        // Updated prices
        recommendation.BasicAmount =
          applyAmountMarkup(recommendation.BasicAmount);

        recommendation.TotalAmount =
          applyAmountMarkup(recommendation.TotalAmount);

        // Nested Rate Plans
        recommendation?.RatePlanDetails?.forEach((rate) => {

          rate.OriginalBasicAmount = rate.BasicAmount;

          rate.OriginalTotalAmount = rate.TotalAmount;

          rate.BasicAmount =
            applyAmountMarkup(rate.BasicAmount);

          rate.TotalAmount =
            applyAmountMarkup(rate.TotalAmount);
        });
      }
    );

    return {
      ...supplierData,

      pricingSummary: {
        markupApplied: markupValue,
        markupType,
        serviceTaxApplied: serviceTax,
      },
    };

  } catch (err) {

    console.log(err);

    return null;
  }
};