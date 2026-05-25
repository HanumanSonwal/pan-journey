

// // hotelPricing.service.js

import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

// export const applyPricing = async (supplierData, hotelMeta) => {
//   try {

//     console.log("\n================= PRICING ENGINE START =================");

//     console.log("📌 Incoming hotelMeta:", hotelMeta);

//     const { hotelId, cityName, stateName, countryCode } = hotelMeta;

//     // ✅ Get Markup
//     const markupDoc = await getMarkup({
//       hotelId,
//       cityName,
//       stateName,
//       countryCode,
//     });

//     console.log("✅ Markup Doc Found:", markupDoc);

//     // ✅ Get Service Tax
//     const serviceTaxDoc = await getServiceTax();

//     console.log("✅ Service Tax Doc:", serviceTaxDoc);

//     const markupValue = markupDoc?.markupValue || 0;
//     const markupType = markupDoc?.markupType || "flat";

//     const serviceTax = serviceTaxDoc?.markupValue || 0;

//     console.log("📌 Final Markup Value:", markupValue);
//     console.log("📌 Final Markup Type:", markupType);
//     console.log("📌 Final Service Tax:", serviceTax);

//     // ✅ Helper function
//     const applyAmountMarkup = (amount) => {

//       amount = Number(amount || 0);

//       console.log("\n-----------------------------------");
//       console.log("💰 Original Amount:", amount);

//       let updated = amount;

//       // ✅ Markup Apply
//       if (markupType === "percentage") {

//         const markupAmount = (amount * markupValue) / 100;

//         console.log("📈 Percentage Markup:", markupAmount);

//         updated += markupAmount;

//       } else {

//         console.log("📈 Flat Markup:", markupValue);

//         updated += markupValue;
//       }

//       console.log("💵 After Markup:", updated);

//       // ✅ Service Tax Apply
//       const serviceTaxAmount = (updated * serviceTax) / 100;

//       console.log("🧾 Service Tax Amount:", serviceTaxAmount);

//       updated += serviceTaxAmount;

//       console.log("✅ Final Amount:", updated);

//       console.log("-----------------------------------\n");

//       return Number(updated.toFixed(2));
//     };

//     console.log(
//       "\n📦 Total Recommendations:",
//       supplierData?.RatePlanRecommendations?.length || 0
//     );

//     // ✅ Apply pricing on every recommendation
//     supplierData?.RatePlanRecommendations?.forEach(
//       (recommendation, index) => {

//         console.log(
//           `\n================= RECOMMENDATION ${index + 1} =================`
//         );

//         console.log("📌 Before Update:", {
//           BasicAmount: recommendation.BasicAmount,
//           TotalAmount: recommendation.TotalAmount,
//         });

//         // ✅ Store Original
//         recommendation.OriginalBasicAmount =
//           recommendation.BasicAmount;

//         recommendation.OriginalTotalAmount =
//           recommendation.TotalAmount;

//         // ✅ Update Main Recommendation
//         recommendation.BasicAmount = applyAmountMarkup(
//           recommendation.BasicAmount
//         );

//         recommendation.TotalAmount = applyAmountMarkup(
//           recommendation.TotalAmount
//         );

//         console.log("✅ After Main Update:", {
//           BasicAmount: recommendation.BasicAmount,
//           TotalAmount: recommendation.TotalAmount,
//         });

//         // ✅ Nested Rate Plans
//         recommendation?.RatePlanDetails?.forEach((rate, rateIndex) => {

//           console.log(
//             `\n🔹 RatePlan ${rateIndex + 1}`
//           );

//           console.log("📌 Before Rate Update:", {
//             BasicAmount: rate.BasicAmount,
//             TotalAmount: rate.TotalAmount,
//           });

//           // Store original
//           rate.OriginalBasicAmount = rate.BasicAmount;
//           rate.OriginalTotalAmount = rate.TotalAmount;

//           // Apply updated pricing
//           rate.BasicAmount = applyAmountMarkup(rate.BasicAmount);

//           rate.TotalAmount = applyAmountMarkup(rate.TotalAmount);

//           console.log("✅ After Rate Update:", {
//             BasicAmount: rate.BasicAmount,
//             TotalAmount: rate.TotalAmount,
//           });
//         });
//       }
//     );

//     console.log("\n================= FINAL RESPONSE =================");

//     console.log(
//       JSON.stringify(
//         {
//           pricingSummary: {
//             markupApplied: markupValue,
//             markupType,
//             serviceTaxApplied: serviceTax,
//           },
//         },
//         null,
//         2
//       )
//     );

//     console.log("================= PRICING ENGINE END =================\n");

//     // ✅ Return updated supplier data
//     return {
//       supplierData,

//       pricingSummary: {
//         markupApplied: markupValue,
//         markupType,
//         serviceTaxApplied: serviceTax,
//       },
//     };

//   } catch (err) {

//     console.log("\n❌❌❌ PRICING ENGINE ERROR ❌❌❌");

//     console.log(err);

//     console.log("❌ Stack:", err?.stack);

//     return null;
//   }
// };
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