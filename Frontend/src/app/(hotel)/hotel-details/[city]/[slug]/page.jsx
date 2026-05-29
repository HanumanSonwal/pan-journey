import { buildCmsMetadata } from "@/modules/cms/helpers/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelDetails from "@/modules/hotel/pages/hotelDetails";

export async function generateMetadata({ params }) {
  const { slug, city } = await params;
  const cms = await fetchCmsBySlug(slug);

  if (cms) {
    return buildCmsMetadata(cms);
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const hotelSlug =
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Hotel";
  const canonical = `${siteUrl}/hotel-details/${city}/${slug}`;
  return {
    metadataBase: new URL(siteUrl),
    title: `${hotelSlug} | PAN Journey`,
    description: `Book ${hotelSlug} with verified hotel details and best prices on PAN Journey.`,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [
      {
        name: "PAN Journey",
      },
    ],
    creator: "PAN Journey",
    publisher: "PAN Journey",
  };
}

export default async function Page({ params, searchParams }) {
  const { slug, city } = await params;
  const query = await searchParams;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const cms = await fetchCmsBySlug(slug);
  const hotelName =
    cms?.data?.hotelMeta?.hotelName ||
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase());

  const schema = cms?.schema || {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Hotels",
            item: `${siteUrl}/hotels`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city?.replace(/-/g, " ") || "",
            item: `${siteUrl}/hotels/${city}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: hotelName,
            item: `${siteUrl}/hotel-details/${city}/${slug}`,
          },
        ],
      },

      {
        "@type": "Hotel",
        name: hotelName,
        description:
          cms?.metaDescription ||
          "Hotel details and booking information on PAN Journey.",
        url: `${siteUrl}/hotel-details/${city}/${slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality:
            cms?.data?.cityMeta?.destination || city?.replace(/-/g, " "),
        },
        publisher: {
          "@type": "Organization",

          name: "PAN Journey",
        },
      },

      {
        "@type": "Organization",
        name: "PAN Journey",
        url: siteUrl,
      },
    ],
  };
  const hotelId = cms?.entityId || query?.hid;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <HotelDetails
        initialPayload={{
          hotelId,
        }}
        cms={cms}
      />
    </>
  );
}
