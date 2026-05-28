import { getAllCmsPages } from "@/modules/cms/api/cms.service";

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let cmsPages = [];

  try {
    cmsPages = await getAllCmsPages();
  } catch (err) {
    console.log("SITEMAP CMS ERROR", err);
  }

  /*
  STATIC ROUTES
  */
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: `${siteUrl}/hotels`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];

  /*
  CMS ROUTES
  */
  const cmsRoutes =
    cmsPages.map((page) => {
      let url = siteUrl;

      switch (page?.entityType) {
        case "hotelCity":
        case "city":
          url = `${siteUrl}/hotels/${page.slug}`;
          break;

        case "hotel":
          const citySlug =
            page?.data?.cityMeta?.destination
              ?.split(",")?.[0]
              ?.trim()
              ?.toLowerCase()
              ?.replace(/[^a-z0-9\s-]/g, "")
              ?.replace(/\s+/g, "-") || "";

          url = `${siteUrl}/hotel-details/${citySlug}/${page.slug}`;
          break;

        default:
          url = `${siteUrl}/${page.slug}`;
      }

      return {
        url,

        lastModified: page.updatedAt || new Date(),

        priority: page.entityType === "hotel" ? 0.9 : 0.8,
      };
    }) || [];

  return [...staticRoutes, ...cmsRoutes];
}
