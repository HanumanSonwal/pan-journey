import { DESTINATIONS } from "./desitanation.data.js";

export const getHomeDestinations = async (type) => {
  if (!type || !DESTINATIONS[type]) {
    throw new Error("Invalid destination type");
  }

  return DESTINATIONS[type];
};