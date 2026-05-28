import { getCmsBySlug } from "../api/cms.service";

export const fetchCmsBySlug = async (slug) => {
  try {
    const data = await getCmsBySlug(slug);
    console.log("CMS FETCH DATA", data);
    return data;
  } catch (error) {
    console.log("CMS FETCH ERROR", error?.response?.status);
    console.log("CMS FETCH MESSAGE", error?.response?.data);
    console.log("FULL ERROR", error);

    return null;
  }
};
