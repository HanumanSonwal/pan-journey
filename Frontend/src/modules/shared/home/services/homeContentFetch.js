import { cache } from "react";

import { getHomeContent } from "./homeFetch";

export const fetchHomeContent = cache(async () => {
  try {
    return await getHomeContent();
  } catch (error) {
    console.error("HOME CONTENT FETCH ERROR", error);

    return null;
  }
});
