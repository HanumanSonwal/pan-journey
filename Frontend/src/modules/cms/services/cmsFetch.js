import { cache } from "react";
import { getCmsBySlug } from "./cms.service";

export const fetchCmsBySlug = cache(async (slug, preview = false) => {
  try {
    const data = await getCmsBySlug(slug, preview);

    console.log("CMS FETCH", slug, "PREVIEW:", preview);

    return data;
  } catch (error) {
    console.log("CMS FETCH ERROR STATUS", error?.response?.status);
    console.log("CMS FETCH ERROR DATA", error?.response?.data);

    return null;
  }
});
