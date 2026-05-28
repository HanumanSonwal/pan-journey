export const buildCmsMetadata = (cms) => {
  if (!cms) {
    return {};
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const slug = cms?.slug || "";
  const canonical = `${siteUrl}${slug.startsWith("/") ? "" : "/"}${slug}`;
  const title = cms?.metaTitle || cms?.title || "PAN Journey";
  const description =
    cms?.metaDescription ||
    "Find hotels, destinations and travel experiences on PAN Journey.";
  const keywords = cms?.keywords || [];
  const image =
    cms?.data?.heroImage ||
    cms?.data?.bannerImage ||
    cms?.data?.coverImage ||
    "/images/default-og.jpg";
  const robots =
    cms?.isPublished === false
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        };

  return {
    /*
    BASIC
    */
    title,
    description,
    keywords,

    /*
    CANONICAL
    */
    alternates: {
      canonical,
    },

    /*
    ROBOTS
    */
    robots,

    /*
    OPEN GRAPH
    */
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "PAN Journey",
      type: "website",
      locale: "en_IN",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },

    /*
    TWITTER
    */
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },

    /*
    AUTHOR / PUBLISHER
    */
    authors: [
      {
        name: "PAN Journey",
      },
    ],

    publisher: "PAN Journey",

    /*
    EXTRA
    */
    metadataBase: new URL(siteUrl),

    category: "travel",

    /*
    SCHEMA JSON-LD
    */
    other: {
      schema: cms?.schema ? JSON.stringify(cms.schema) : null,
    },
  };
};
