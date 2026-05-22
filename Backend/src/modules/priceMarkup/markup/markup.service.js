import Markup from "./markup.model.js";

export const getMarkup = async ({
  hotelId,
  cityName,
  stateName,
  countryCode,
}) => {
  // 1️⃣ HOTEL LEVEL
  let markup = await Markup.findOne({
    level: "hotel",
    hotelId,
    isActive: true,
  });
  if (markup) return markup;

  // 2️⃣ CITY LEVEL
  markup = await Markup.findOne({
    level: "city",
    cityName,
    stateName,
    countryCode,
    isActive: true,
  });
  if (markup) return markup;

  // 3️⃣ STATE LEVEL
  markup = await Markup.findOne({
    level: "state",
    stateName,
    countryCode,
    isActive: true,
  });
  if (markup) return markup;

  // 4️⃣ COUNTRY LEVEL
  markup = await Markup.findOne({
    level: "country",
    countryCode,
    isActive: true,
  });
  if (markup) return markup;

  // 5️⃣ WORLDWIDE
  markup = await Markup.findOne({
    level: "worldwide",
    isActive: true,
  });
  const serviceTax = await getServiceTax();

  return {
    markup,
    serviceTax,
  };
};

export const getServiceTax = async () => {
  return await Markup.findOne({
    level: "serviceTax",
    isActive: true,
  });
};
