import { getMarkup, getServiceTax } from "../../priceMarkup/markup/markup.service.js";

export const applyPricing = async (supplierData, hotelMeta) => {
  try {
    const { hotelId, cityName, stateName, countryCode } = hotelMeta;

    // 🎯 get markup based on hierarchy
    const markupDoc = await getMarkup({
      hotelId,
      cityName,
      stateName,
      countryCode,
    });

    // 💰 get service tax (global)
    const serviceTaxDoc = await getServiceTax();

    const markupValue = markupDoc?.markupValue || 0;
    const markupType = markupDoc?.markupType || "flat";

    const serviceTax = serviceTaxDoc?.markupValue || 0; // percentage assume

    /* --------------------------------------------
       Supplier price extract (IMPORTANT)
       Supplier detail API me price yaha hota hai
    --------------------------------------------- */

    const basePrice =
      supplierData?.HotelDetails?.HotelRooms?.[0]?.TotalAmount || 0;

    let priceAfterMarkup = basePrice;

    // ➕ Apply markup
    if (markupType === "percentage") {
      priceAfterMarkup += (basePrice * markupValue) / 100;
    } else {
      priceAfterMarkup += markupValue;
    }

    // ➕ Apply service tax (always %)
    const finalPrice =
      priceAfterMarkup + (priceAfterMarkup * serviceTax) / 100;

    return {
      basePrice,
      markupApplied: markupValue,
      serviceTaxApplied: serviceTax,
      finalPrice,
    };
  } catch (err) {
    console.log("Pricing Engine Error", err);
    return null;
  }
};