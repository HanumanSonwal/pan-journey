// //import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

// // export const applyPricing = async (supplierData, hotelMeta) => {
// //   try {
// //     const { hotelId, cityName, stateName, countryCode } = hotelMeta;

// //     // 🎯 get markup based on hierarchy
// //     const markupDoc = await getMarkup({
// //       hotelId,
// //       cityName,
// //       stateName,
// //       countryCode,
// //     });

// //     // 💰 get service tax (global)0
// //     const serviceTaxDoc = await getServiceTax();

// //     const markupValue = markupDoc?.markupValue || 0;
// //     const markupType = markupDoc?.markupType || "flat";

// //     const serviceTax = serviceTaxDoc?.markupValue || 0; // percentage assume

// //     /* --------------------------------------------
// //        Supplier price extract (IMPORTANT)
// //        Supplier detail API me price yaha hota hai
// //     --------------------------------------------- */

// //     const basePrice =
// //       supplierData?.HotelDetails?.HotelRooms?.[0]?.TotalAmount || 0;

// //     let priceAfterMarkup = basePrice;

// //     // ➕ Apply markup
// //     if (markupType === "percentage") {
// //       priceAfterMarkup += (basePrice * markupValue) / 100;
// //     } else {
// //       priceAfterMarkup += markupValue;
// //     }

// //     // ➕ Apply service tax (always %)
// //     const finalPrice =
// //       priceAfterMarkup + (priceAfterMarkup * serviceTax) / 100;

// //     return {
// //       basePrice,
// //       markupApplied: markupValue,
// //       serviceTaxApplied: serviceTax,
// //       finalPrice,
// //     };
// //   } catch (err) {
// //     console.log("Pricing Engine Error", err);
// //     return null;
// //   }
// // };

// // import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

// // export const applyPricing = async (supplierData, hotelMeta) => {
// //   try {
// //     const { hotelId, cityName, stateName, countryCode } = hotelMeta;

// //     // ✅ Get Markup
// //     const markupDoc = await getMarkup({
// //       hotelId,
// //       cityName,
// //       stateName,
// //       countryCode,
// //     });

// //     // ✅ Get Service Tax
// //     const serviceTaxDoc = await getServiceTax();

// //     const markupValue = markupDoc?.markupValue || 0;
// //     const markupType = markupDoc?.markupType || "flat";

// //     const serviceTax = serviceTaxDoc?.markupValue || 0;

// //     // ✅ Helper function
// //     const applyAmountMarkup = (amount) => {
// //       amount = Number(amount || 0);

// //       let updated = amount;

// //       // Markup
// //       if (markupType === "percentage") {
// //         updated += (amount * markupValue) / 100;
// //       } else {
// //         updated += markupValue;
// //       }

// //       // Service Tax
// //       updated += (updated * serviceTax) / 100;

// //       return Number(updated.toFixed(2));
// //     };

// //     // ✅ Apply pricing on every recommendation
// //     supplierData?.RatePlanRecommendations?.forEach((recommendation) => {

// //       // Main Recommendation Pricing
// //       recommendation.OriginalBasicAmount = recommendation.BasicAmount;
// //       recommendation.OriginalTotalAmount = recommendation.TotalAmount;

// //       recommendation.BasicAmount = applyAmountMarkup(
// //         recommendation.BasicAmount
// //       );

// //       recommendation.TotalAmount = applyAmountMarkup(
// //         recommendation.TotalAmount
// //       );

// //       // Nested Rate Plans
// //       recommendation?.RatePlanDetails?.forEach((rate) => {

// //         rate.OriginalBasicAmount = rate.BasicAmount;
// //         rate.OriginalTotalAmount = rate.TotalAmount;

// //         rate.BasicAmount = applyAmountMarkup(rate.BasicAmount);

// //         rate.TotalAmount = applyAmountMarkup(rate.TotalAmount);
// //       });
// //     });

// //     // ✅ Return updated supplier data
// //     return {
// //       supplierData,
// //       pricingSummary: {
// //         markupApplied: markupValue,
// //         markupType,
// //         serviceTaxApplied: serviceTax,
// //       },
// //     };

// //   } catch (err) {
// //     console.log("Pricing Engine Error", err);
// //     return null;
// //   }
// // };


// // hotelPricing.service.js

import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

export const applyPricing = async (supplierData, hotelMeta) => {
  try {

    console.log("\n================= PRICING ENGINE START =================");

    console.log("📌 Incoming hotelMeta:", hotelMeta);

    const { hotelId, cityName, stateName, countryCode } = hotelMeta;

    // ✅ Get Markup
    const markupDoc = await getMarkup({
      hotelId,
      cityName,
      stateName,
      countryCode,
    });

    console.log("✅ Markup Doc Found:", markupDoc);

    // ✅ Get Service Tax
    const serviceTaxDoc = await getServiceTax();

    console.log("✅ Service Tax Doc:", serviceTaxDoc);

    const markupValue = markupDoc?.markupValue || 0;
    const markupType = markupDoc?.markupType || "flat";

    const serviceTax = serviceTaxDoc?.markupValue || 0;

    console.log("📌 Final Markup Value:", markupValue);
    console.log("📌 Final Markup Type:", markupType);
    console.log("📌 Final Service Tax:", serviceTax);

    // ✅ Helper function
    const applyAmountMarkup = (amount) => {

      amount = Number(amount || 0);

      console.log("\n-----------------------------------");
      console.log("💰 Original Amount:", amount);

      let updated = amount;

      // ✅ Markup Apply
      if (markupType === "percentage") {

        const markupAmount = (amount * markupValue) / 100;

        console.log("📈 Percentage Markup:", markupAmount);

        updated += markupAmount;

      } else {

        console.log("📈 Flat Markup:", markupValue);

        updated += markupValue;
      }

      console.log("💵 After Markup:", updated);

      // ✅ Service Tax Apply
      const serviceTaxAmount = (updated * serviceTax) / 100;

      console.log("🧾 Service Tax Amount:", serviceTaxAmount);

      updated += serviceTaxAmount;

      console.log("✅ Final Amount:", updated);

      console.log("-----------------------------------\n");

      return Number(updated.toFixed(2));
    };

    console.log(
      "\n📦 Total Recommendations:",
      supplierData?.RatePlanRecommendations?.length || 0
    );

    // ✅ Apply pricing on every recommendation
    supplierData?.RatePlanRecommendations?.forEach(
      (recommendation, index) => {

        console.log(
          `\n================= RECOMMENDATION ${index + 1} =================`
        );

        console.log("📌 Before Update:", {
          BasicAmount: recommendation.BasicAmount,
          TotalAmount: recommendation.TotalAmount,
        });

        // ✅ Store Original
        recommendation.OriginalBasicAmount =
          recommendation.BasicAmount;

        recommendation.OriginalTotalAmount =
          recommendation.TotalAmount;

        // ✅ Update Main Recommendation
        recommendation.BasicAmount = applyAmountMarkup(
          recommendation.BasicAmount
        );

        recommendation.TotalAmount = applyAmountMarkup(
          recommendation.TotalAmount
        );

        console.log("✅ After Main Update:", {
          BasicAmount: recommendation.BasicAmount,
          TotalAmount: recommendation.TotalAmount,
        });

        // ✅ Nested Rate Plans
        recommendation?.RatePlanDetails?.forEach((rate, rateIndex) => {

          console.log(
            `\n🔹 RatePlan ${rateIndex + 1}`
          );

          console.log("📌 Before Rate Update:", {
            BasicAmount: rate.BasicAmount,
            TotalAmount: rate.TotalAmount,
          });

          // Store original
          rate.OriginalBasicAmount = rate.BasicAmount;
          rate.OriginalTotalAmount = rate.TotalAmount;

          // Apply updated pricing
          rate.BasicAmount = applyAmountMarkup(rate.BasicAmount);

          rate.TotalAmount = applyAmountMarkup(rate.TotalAmount);

          console.log("✅ After Rate Update:", {
            BasicAmount: rate.BasicAmount,
            TotalAmount: rate.TotalAmount,
          });
        });
      }
    );

    console.log("\n================= FINAL RESPONSE =================");

    console.log(
      JSON.stringify(
        {
          pricingSummary: {
            markupApplied: markupValue,
            markupType,
            serviceTaxApplied: serviceTax,
          },
        },
        null,
        2
      )
    );

    console.log("================= PRICING ENGINE END =================\n");

    // ✅ Return updated supplier data
    return {
      supplierData,

      pricingSummary: {
        markupApplied: markupValue,
        markupType,
        serviceTaxApplied: serviceTax,
      },
    };

  } catch (err) {

    console.log("\n❌❌❌ PRICING ENGINE ERROR ❌❌❌");

    console.log(err);

    console.log("❌ Stack:", err?.stack);

    return null;
  }
};

// hotelPricing.service.js

// import {
//   getMarkup,
//   getServiceTax,
// } from "../../priceMarkup/markup/markup.service.js";

// export const applyPricing = async (
//   supplierData,
//   hotelMeta
// ) => {
//   try {

//     console.log(
//       "\n================= PRICING ENGINE START ================="
//     );

//     console.log("📌 Incoming hotelMeta:", hotelMeta);

//     const {
//       hotelId,
//       cityName,
//       stateName,
//       countryCode,
//     } = hotelMeta;

//     /**
//      * ✅ Get Markup
//      */
//     const markupDoc = await getMarkup({
//       hotelId,
//       cityName,
//       stateName,
//       countryCode,
//     });

//     console.log("✅ Markup Doc Found:", markupDoc);

//     /**
//      * ✅ Get Service Tax
//      */
//     const serviceTaxDoc =
//       await getServiceTax();

//     console.log(
//       "✅ Service Tax Doc:",
//       serviceTaxDoc
//     );

//     const markupValue =
//       markupDoc?.markupValue || 0;

//     const markupType =
//       markupDoc?.markupType || "flat";

//     const serviceTax =
//       serviceTaxDoc?.markupValue || 0;

//     console.log(
//       "📌 Final Markup Value:",
//       markupValue
//     );

//     console.log(
//       "📌 Final Markup Type:",
//       markupType
//     );

//     console.log(
//       "📌 Final Service Tax:",
//       serviceTax
//     );

//     /**
//      * ✅ Pricing Calculator
//      */
//     const calculatePricing = (amount) => {

//       amount = Number(amount || 0);

//       console.log("\n-----------------------------------");

//       console.log(
//         "💰 Original Amount:",
//         amount
//       );

//       /**
//        * ✅ Markup
//        */
//       let markupAmount = 0;

//       if (markupType === "percentage") {

//         markupAmount =
//           (amount * markupValue) / 100;

//       } else {

//         markupAmount = markupValue;
//       }

//       console.log(
//         "📈 Markup Amount:",
//         markupAmount
//       );

//       /**
//        * ✅ After Markup
//        */
//       const afterMarkup =
//         amount + markupAmount;

//       console.log(
//         "💵 After Markup:",
//         afterMarkup
//       );

//       /**
//        * ✅ Service Tax
//        */
//       const serviceTaxAmount =
//         (afterMarkup * serviceTax) / 100;

//       console.log(
//         "🧾 Service Tax Amount:",
//         serviceTaxAmount
//       );

//       /**
//        * ✅ Final Amount
//        */
//       const finalAmount =
//         afterMarkup + serviceTaxAmount;

//       console.log(
//         "✅ Final Amount:",
//         finalAmount
//       );

//       console.log(
//         "-----------------------------------\n"
//       );

//       return {
//         originalAmount: Number(
//           amount.toFixed(2)
//         ),

//         markupAmount: Number(
//           markupAmount.toFixed(2)
//         ),

//         serviceTaxAmount: Number(
//           serviceTaxAmount.toFixed(2)
//         ),

//         finalAmount: Number(
//           finalAmount.toFixed(2)
//         ),
//       };
//     };

//     /**
//      * ✅ Pricing Recommendations
//      */
//     // const pricingRecommendations = [];

//     // console.log(
//     //   "\n📦 Total Recommendations:",
//     //   supplierData
//     //     ?.RatePlanRecommendations?.length || 0
//     // );

//     // /**
//     //  * ✅ Loop Recommendations
//     //  */
//     // supplierData?.RatePlanRecommendations?.forEach(
//     //   (recommendation, index) => {

//     //     console.log(
//     //       `\n================= RECOMMENDATION ${
//     //         index + 1
//     //       } =================`
//     //     );

//     //     /**
//     //      * ✅ Rate Plans Pricing
//     //      */
//     //     const ratePlansPricing = [];

//     //     recommendation?.RatePlanDetails?.forEach(
//     //       (rate, rateIndex) => {

//     //         console.log(
//     //           `\n🔹 RatePlan ${
//     //             rateIndex + 1
//     //           }`
//     //         );

//     //         /**
//     //          * ✅ Basic Pricing
//     //          */
//     //         const basicPricing =
//     //           calculatePricing(
//     //             rate.BasicAmount
//     //           );

//     //         /**
//     //          * ✅ Total Pricing
//     //          */
//     //         const totalPricing =
//     //           calculatePricing(
//     //             rate.TotalAmount
//     //           );

//     //         /**
//     //          * ✅ Push RatePlan Pricing
//     //          */
//     //         ratePlansPricing.push({

//     //           rateplanId:
//     //             rate.RateplanId,

//     //           pricing: {

//     //             basic: basicPricing,

//     //             total: totalPricing,
//     //           },
//     //         });
//     //       }
//     //     );

//     //     /**
//     //      * ✅ Push Recommendation
//     //      */
//     //     pricingRecommendations.push({

//     //       recommendationId:
//     //         recommendation.RecommendationId,

//     //       ratePlans:
//     //         ratePlansPricing,
//     //     });
//     //   }
//     // );
// /**
//  * ✅ Final Rooms
//  */
// const formattedRooms = [];

// console.log(
//   "\n📦 Total Recommendations:",
//   supplierData
//     ?.RatePlanRecommendations?.length || 0
// );

// /**
//  * ✅ Loop Recommendations
//  */
// supplierData?.RatePlanRecommendations?.forEach(
//   (recommendation, index) => {

//     console.log(
//       `\n================= RECOMMENDATION ${
//         index + 1
//       } =================`
//     );

//     recommendation?.RatePlanDetails?.forEach(
//       (rate, rateIndex) => {

//         console.log(
//           `\n🔹 RatePlan ${
//             rateIndex + 1
//           }`
//         );

//         /**
//          * ✅ Pricing
//          */
//         const pricing =
//           calculatePricing(
//             rate.BasicAmount
//           );

//         /**
//          * ✅ Room Data
//          */
//         const room =
//           rate?.RoomDetails?.[0] || {};

//         /**
//          * ✅ Push Final Room
//          */
//         formattedRooms.push({

//           recommendationId:
//             recommendation.RecommendationId,

//           rateplanId:
//             rate.RateplanId,

//           pricing,

//           roomInfo: {

//             groupName:
//               room.GroupName || "",

//             roomTypeId:
//               room.RoomTypeID || "",

//             description:
//               room.HotelRoomTypeDesc || "",

//             smokingAllowed:
//               room.SmokingAllowed || false,

//             refundable:
//               rate.Refundable || "False",

//             cancellationPolicy:
//               rate.CancellationPolicy || "",
//           },

//           inclusions:
//             rate.Inclusion
//               ?.split(",")
//               ?.map((x) => x.trim())
//               ?.filter(Boolean) || [],

//           images:
//             room?.HotelGallery?.map(
//               (img) => img.ImageURL
//             ) || [],

//           essentialInformation:
//             rate.EssentialInformation || [],
//         });
//       }
//     );
//   }
// );
//     /**
//      * ✅ Final Response
//      */
//   //   const finalResponse = {

//   // supplierBasePrice: Number(
//   //   amount.toFixed(2)
//   // ),

//   // markupAmount: Number(
//   //   markupAmount.toFixed(2)
//   // ),

//   // basePrice: Number(
//   //   afterMarkup.toFixed(2)
//   // ),

//   // serviceTaxAmount: Number(
//   //   serviceTaxAmount.toFixed(2)
//   // ),

//   // finalPrice: Number(
//   //   finalAmount.toFixed(2)
//   // ),
//   //   };

//     console.log(
//       "\n================= FINAL RESPONSE ================="
//     );

//     console.log(
//       JSON.stringify(
//         finalResponse,
//         null,
//         2
//       )
//     );

//     console.log(
//       "================= PRICING ENGINE END =================\n"
//     );

//     return finalResponse;

//   } catch (err) {

//     console.log(
//       "\n❌❌❌ PRICING ENGINE ERROR ❌❌❌"
//     );

//     console.log(err);

//     console.log(
//       "❌ Stack:",
//       err?.stack
//     );

//     return null;
//   }
// };