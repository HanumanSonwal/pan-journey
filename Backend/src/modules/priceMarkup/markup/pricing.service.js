// // // export const applyMarkup = (
// // //   hotel,
// // //   markup
// // // ) => {

// // //   if (!markup) return hotel;

// // //   let price = Number(hotel.price || 0);
// // //   let tax = Number(hotel.tax || 0);

// // //   if (markup.markupType === "percentage") {
// // //     price += (price * markup.markupValue) / 100;
// // //     tax += (tax * markup.markupValue) / 100;
// // //   }

// // //   if (markup.markupType === "fixed") {
// // //     price += Number(markup.markupValue);
// // //     tax += Number(markup.markupValue);
// // //   }

// // //   return {
// // //     ...hotel,
// // //     price: Number(price.toFixed(2)),
// // //     tax: Number(tax.toFixed(2)),
// // //   };
// // // };
// // export const applyMarkup = (
// //   hotel,
// //   markup
// // ) => {
// //   if (!markup) return hotel;

// //   let price = Number(hotel.price || 0);

// //   if (markup.markupType === "percentage") {
// //     price += (price * markup.markupValue) / 100;
// //   }

// //   if (markup.markupType === "fixed") {
// //     price += Number(markup.markupValue);
// //   }

// //   const tax = (price * 5) / 100;

// //   return {
// //     ...hotel,
// //     originalPrice: hotel.price,
// //     originalTax: hotel.tax,
// //     price: Number(price.toFixed(2)),
// //     tax: Number(tax.toFixed(2)),
// //   };
// // };

// export const applyMarkup = (
//   hotel,
//   markup,
//   serviceTax = 0
// ) => {
//   if (!markup) return hotel;

//   let price = Number(hotel.price || 0);

//   if (markup.markupType === "percentage") {
//     price += (price * markup.markupValue) / 100;
//   }

//   if (
//     markup.markupType === "fixed" ||
//     markup.markupType === "flat"
//   ) {
//     price += Number(markup.markupValue);
//   }

//   const tax = (price * Number(serviceTax)) / 100;

//   return {
//     ...hotel,
//     originalPrice: hotel.price,
//     originalTax: hotel.tax,
//     price: Number(price.toFixed(2)),
//     tax: Number(tax.toFixed(2)),
//   };
// };

export const applyMarkup = (
  hotel,
  markup,
  serviceTax
) => {
  if (!markup) return hotel;

  let price = Number(hotel.price || 0);

  // Save original values
  const originalPrice = price;
  const originalTax = Number(hotel.tax || 0);

  // Markup Apply
  if (markup.markupType === "percentage") {
    price += (price * markup.markupValue) / 100;
  }

  if (markup.markupType === "fixed") {
    price += Number(markup.markupValue);
  }

  // Service Tax Apply
  let tax = 0;

  if (serviceTax) {
    if (serviceTax.markupType === "percentage") {
      tax = (price * serviceTax.markupValue) / 100;
    }

    if (serviceTax.markupType === "fixed") {
      tax = Number(serviceTax.markupValue);
    }
  }

  return {
    ...hotel,

    originalPrice,
    originalTax,

    price: Number(price.toFixed(2)),
    tax: Number(tax.toFixed(2)),
  };
};