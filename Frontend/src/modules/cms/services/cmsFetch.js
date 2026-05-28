import { getCmsBySlug } from "../api/cms.service";

export const fetchCmsBySlug = async ({ slug, type }) => {
  try {
    const res = await getCmsBySlug({
      slug,
      type,
    });

    console.log("CMS API RES:", res);

    if (!res?.success) {
      return null;
    }

    console.log("CMS DATA:", res?.data);

    return res?.data?.[0] || null;
  } catch (error) {
    console.log("CMS FETCH ERROR", error);
    return null;
  }
};
