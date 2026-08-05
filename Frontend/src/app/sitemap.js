// import { getAllCmsPages } from "@/modules/cms/services/cms.service";

// export default async function sitemap() {
//   const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

//   let cmsPages = [];

//   try {
//     cmsPages = await getAllCmsPages();
//   } catch (err) {
//     console.log("SITEMAP CMS ERROR:", err);
//   }

//   /*
//    STATIC APP ROUTES
//   */
//   const staticRoutes = [
//     {
//       url: siteUrl,
//       lastModified: new Date(),
//       priority: 1,
//     },
//     {
//       url: `${siteUrl}/hotels`,
//       lastModified: new Date(),
//       priority: 0.9,
//     },
//     {
//       url: `${siteUrl}/about-us`,
//       lastModified: new Date(),
//       priority: 0.8,
//     },
//     {
//       url: `${siteUrl}/contact-us`,
//       lastModified: new Date(),
//       priority: 0.8,
//     },
//     {
//       url: `${siteUrl}/privacy-policy`,
//       lastModified: new Date(),
//       priority: 0.8,
//     },
//     {
//       url: `${siteUrl}/terms-conditions`,
//       lastModified: new Date(),
//       priority: 0.8,
//     },
//   ];

//   /*
//    CMS ROUTES
//   */
//   const cmsRoutes =
//     cmsPages
//       ?.map((page) => {
//         let url = siteUrl;

//         switch (page?.entityType) {
//           case "hotelCity":
//           case "city":
//             url = `${siteUrl}/hotels/${page.slug}`;
//             break;

//           case "hotel": {
//             const citySlug = page?.data?.cityMeta?.destination
//               ?.split(",")?.[0]
//               ?.trim()
//               ?.toLowerCase()
//               ?.replace(/[^a-z0-9\s-]/g, "")
//               ?.replace(/\s+/g, "-");

//             if (!citySlug) {
//               console.log("❌ HOTEL SKIPPED - NO CITY:", page.slug);
//               return null;
//             }

//             url = `${siteUrl}/hotel-details/${citySlug}/${page.slug}`;
//             break;
//           }

//           default:
//             // HOME duplicate avoid
//             if (!page?.slug || page.slug === "/" || page.slug === "home") {
//               return null;
//             }

//             url = `${siteUrl}/${page.slug}`;
//         }

//         return {
//           url,
//           lastModified: page?.updatedAt || new Date(),
//           priority: page?.entityType === "hotel" ? 0.9 : 0.8,
//         };
//       })
//       .filter(Boolean) || [];

//   /*
//    REMOVE DUPLICATES
//   */
//   const allRoutes = [...staticRoutes, ...cmsRoutes];

//   const uniqueRoutes = Array.from(
//     new Map(allRoutes.map((item) => [item.url, item])).values(),
//   );
//   return uniqueRoutes;
// }

export default function sitemap() {
  return [];
}
