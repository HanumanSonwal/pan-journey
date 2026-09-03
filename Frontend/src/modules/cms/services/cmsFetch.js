import { cache } from "react";
import { getCmsBySlug } from "./cms.service";

export const fetchCmsBySlug = cache(async (slug, preview = false) => {
  try {
    return await getCmsBySlug(slug, preview);
  } catch (error) {
    const status = error?.response?.status;
    if (status === 404) {
      return null;
    }

    console.error("CMS FETCH ERROR:", status || error?.message);

    return null;
  }
});
