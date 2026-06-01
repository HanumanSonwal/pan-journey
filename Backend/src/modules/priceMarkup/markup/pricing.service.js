// export const applyMarkup = (
//   hotel,
//   markup
// ) => {

//   if (!markup) return hotel;

//   let price = Number(hotel.price || 0);
//   let tax = Number(hotel.tax || 0);

//   if (markup.markupType === "percentage") {
//     price += (price * markup.markupValue) / 100;
//     tax += (tax * markup.markupValue) / 100;
//   }

//   if (markup.markupType === "fixed") {
//     price += Number(markup.markupValue);
//     tax += Number(markup.markupValue);
//   }

//   return {
//     ...hotel,
//     price: Number(price.toFixed(2)),
//     tax: Number(tax.toFixed(2)),
//   };
// };
export const applyMarkup = (
  hotel,
  markup
) => {
  if (!markup) return hotel;

  let price = Number(hotel.price || 0);

  if (markup.markupType === "percentage") {
    price += (price * markup.markupValue) / 100;
  }

  if (markup.markupType === "fixed") {
    price += Number(markup.markupValue);
  }

  const tax = (price * 5) / 100;

  return {
    ...hotel,
    originalPrice: hotel.price,
    originalTax: hotel.tax,
    price: Number(price.toFixed(2)),
    tax: Number(tax.toFixed(2)),
  };
};