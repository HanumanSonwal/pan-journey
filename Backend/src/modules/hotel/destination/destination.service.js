import {
  searchDestinationAPI,
} from "./adapters/flyshop/destination.api.js";

import {
  mapDestinationResponse,
} from "./adapters/flyshop/destination.mapper.js";

export const searchDestinationService = async (searchInput) => {
  const response = await searchDestinationAPI(searchInput);
  return mapDestinationResponse(response);
};