import Markup from "./markup.model.js";
import Country from "../countryData/country.model.js";

export const extractNormalizedCity = (input) => {
  if (!input) return null;

  return String(input).trim();
};

export const normalizeName = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

export const getCountryCodeByName = async (countryName) => {
  if (!countryName) return null;

  const country = await Country.findOne({
    countryName: {
      $regex: `^${String(countryName).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      $options: "i",
    },
  })
    .select("countryCode")
    .lean();

  return country?.countryCode?.trim()?.toUpperCase() || null;
};

export const getMarkup = async ({
  hotelId,
  cityName,
  stateName,
  countryCode,
}) => {
  const normalizedHotelId = String(hotelId ?? "").trim();
  const normalizedCity = normalizeName(cityName);
  const normalizedState = normalizeName(stateName);
  const normalizedCountry = String(countryCode ?? "")
    .trim()
    .toUpperCase();

  const rules = await Markup.find({
    isActive: true,
  }).lean();

  const hotelMarkup = rules.find(
    (rule) =>
      rule.level === "hotel" &&
      String(rule.hotelId ?? "").trim() === normalizedHotelId
  );

  if (hotelMarkup) return hotelMarkup;

  const cityMarkup = rules.find(
    (rule) =>
      rule.level === "city" &&
      normalizeName(rule.cityName) === normalizedCity
  );

  if (cityMarkup) return cityMarkup;

  const stateMarkup = rules.find(
    (rule) =>
      rule.level === "state" &&
      normalizeName(rule.stateName) === normalizedState &&
      String(rule.countryCode ?? "")
        .trim()
        .toUpperCase() === normalizedCountry
  );

  if (stateMarkup) return stateMarkup;

  const countryMarkup = rules.find(
    (rule) =>
      rule.level === "country" &&
      String(rule.countryCode ?? "")
        .trim()
        .toUpperCase() === normalizedCountry
  );

  if (countryMarkup) return countryMarkup;

  return (
    rules.find((rule) => rule.level === "worldwide") ||
    null
  );
};
