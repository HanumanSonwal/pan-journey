const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const normalizeUpper = (value) =>
  String(value ?? "")
    .trim()
    .toUpperCase();

/**
 * Resolve markup rule according to priority:
 *
 * HOTEL
 *   ↓
 * CITY
 *   ↓
 * STATE
 *   ↓
 * COUNTRY
 *   ↓
 * WORLDWIDE
 *
 * Search payload destination format:
 *
 * destination: {
 *   type: "city",
 *   city: "Jaipur",
 *   state: "Rajasthan",
 *   country: "India"
 * }
 */
export const resolveRule = ({
  hotelId,
  destination = {},
  countryCode,
  rules = [],
}) => {
  const cityName = destination?.city;
  const stateName = destination?.state;
  const countryName = destination?.country;

  // =====================================================
  // 1. HOTEL LEVEL
  // =====================================================

  const hotelRule = rules.find(
    (rule) =>
      rule.level === "hotel" &&
      normalize(rule.hotelId) === normalize(hotelId)
  );

  if (hotelRule) {
    return hotelRule;
  }

  // =====================================================
  // 2. CITY LEVEL
  // =====================================================

  const cityRule = rules.find(
    (rule) =>
      rule.level === "city" &&
      normalize(rule.cityName) === normalize(cityName)
  );

  if (cityRule) {
    return cityRule;
  }

  // =====================================================
  // 3. STATE LEVEL
  // =====================================================

  const stateRule = rules.find(
    (rule) =>
      rule.level === "state" &&
      normalize(rule.stateName) === normalize(stateName) &&
      (
        !rule.countryCode ||
        normalizeUpper(rule.countryCode) ===
          normalizeUpper(countryCode)
      )
  );

  if (stateRule) {
    return stateRule;
  }

  // =====================================================
  // 4. COUNTRY LEVEL
  // =====================================================

  const countryRule = rules.find(
    (rule) =>
      rule.level === "country" &&
      normalizeUpper(rule.countryCode) ===
        normalizeUpper(countryCode)
  );

  if (countryRule) {
    return countryRule;
  }

  // =====================================================
  // 5. WORLDWIDE LEVEL
  // =====================================================

  const worldwideRule = rules.find(
    (rule) => rule.level === "worldwide"
  );

  return worldwideRule || null;
};