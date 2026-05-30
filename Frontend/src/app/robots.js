export default function robots() {
  const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",

        allow: ["/"],

        disallow: [
          "/dashboard/",
          "/admin/",
          "/api/",
          "/profile/",
          "/booking/",
          "/preview/",
        ],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,

    host: siteUrl,
  };
}
