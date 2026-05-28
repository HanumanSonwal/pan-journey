import { buildCmsMetadata } from "@/modules/cms/helpers/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelDetails from "@/modules/hotel/pages/hotelDetails";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;

  const cms = await fetchCmsBySlug(slug);

  /*
  CMS META
  */
  if (cms) {
    return buildCmsMetadata(cms);
  }

  /*
  FALLBACK META
  */
  const hotelSlug =
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Hotel";

  return {
    title: `${hotelSlug} | PAN Journey`,
    description: `Book ${hotelSlug} with verified hotel details and best prices on PAN Journey.`,

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;

  const query = await searchParams;

  const cms = await fetchCmsBySlug(slug);

  /*
  SCHEMA
  */
  const schema = cms?.schema || {
    "@context": "https://schema.org",

    "@type": "Hotel",

    name:
      cms?.data?.hotelMeta?.hotelName ||
      slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()),

    description:
      cms?.metaDescription ||
      "Hotel details and booking information on PAN Journey.",

    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/hotel-details/${params.city}/${slug}`,

    address: {
      "@type": "PostalAddress",

      addressLocality: cms?.data?.cityMeta?.destination || "",
    },

    publisher: {
      "@type": "Organization",

      name: "PAN Journey",
    },
  };

  /*
  CMS FOUND
  */
  if (cms) {
    return (
      <>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        )}

        <HotelDetails
          initialPayload={{
            hotelId: cms.entityId,
          }}
          cms={cms}
        />
      </>
    );
  }

  /*
  FALLBACK
  */
  const hotelId = query?.hid;

  return (
    <HotelDetails
      initialPayload={{
        hotelId,
      }}
      cms={null}
    />
  );
}
