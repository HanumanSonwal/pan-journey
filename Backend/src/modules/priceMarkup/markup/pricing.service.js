// modules/markup/pricing.service.js

export const applyMarkup = (price, markup) => {
  if (!markup) return price;

  if (markup.markupType === "percentage") {
    return price + (price * markup.markupValue) / 100;
  }

  if (markup.markupType === "fixed") {
    return price + markup.markupValue;
  }

  return price;
};