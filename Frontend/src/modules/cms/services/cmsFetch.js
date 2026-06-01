import { getCmsBySlug } from "./cms.service";

export const fetchCmsBySlug = async (slug, preview = false) => {
  try {
    const data = await getCmsBySlug(slug, preview);
    console.log("CMS FETCH", slug, "PREVIEW:", preview);
    console.log("CMS FETCH DATA", data);
    return data;
  } catch (error) {
    console.log("CMS FETCH ERROR STATUS", error?.response?.status);
    console.log("CMS FETCH ERROR DATA", error?.response?.data);
    console.log("FULL ERROR", error);
    return null;
  }
};
