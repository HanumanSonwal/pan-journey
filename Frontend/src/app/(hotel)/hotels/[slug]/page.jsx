import CMSContentRenderer from "@/modules/cms/components/renderer/CMSContentRenderer";
import { buildCmsMetadata } from "@/modules/cms/helpers/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelContent from "@/modules/hotel/pages/Hotel";
import { searchDestinationServer } from "@/modules/hotel/services/search.server";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const cms = await fetchCmsBySlug(slug);

  /*
    CMS SEO
  */
  if (cms) {
    return buildCmsMetadata(cms);
  }

  /*
    DEFAULT SEO
  */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const cityName =
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) ||
    "Hotels";

  const canonical = `${siteUrl}/hotels/${slug}`;

  return {
    metadataBase: new URL(siteUrl),

    title: `Hotels in ${cityName} | PAN Journey`,

    description: `Find hotels in ${cityName} with verified listings, best prices and travel insights on PAN Journey.`,

    keywords: [
      `${cityName} hotels`,
      `Hotels in ${cityName}`,
      `${cityName} stay`,
      "hotel booking",
      "PAN Journey",
    ],

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

    openGraph: {
      title: `Hotels in ${cityName} | PAN Journey`,
      description: `Find hotels in ${cityName} with verified listings and best prices.`,
      url: canonical,
      siteName: "PAN Journey",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `Hotels in ${cityName} | PAN Journey`,
      description: `Find hotels in ${cityName} with verified listings and best prices.`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const cms = await fetchCmsBySlug(slug);

  let cityName =
    slug?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || "";

  let cityId = "";

  /*
    CMS FOUND
  */
  if (cms && cms?.data?.cityMeta?.destinationId) {
    cityName = cms?.data?.cityMeta?.destination || cityName;
    cityId = cms?.data?.cityMeta?.destinationId;
  } else {
    /*
      FALLBACK
    */
    const destinations = await searchDestinationServer(cityName);

    const matchedCity = destinations?.[0];

    cityName = matchedCity?.destination || cityName;
    cityId = matchedCity?.id || "";
  }

  /*
    CITY SCHEMA
  */
  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      /*
        BREADCRUMB
      */
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
            name: cityName,
            item: `${siteUrl}/hotels/${slug}`,
          },
        ],
      },

      /*
        COLLECTION PAGE
      */
      {
        "@type": "CollectionPage",

        name: `Hotels in ${cityName}`,

        url: `${siteUrl}/hotels/${slug}`,

        description:
          cms?.metaDescription ||
          `Find hotels in ${cityName} with best prices on PAN Journey.`,
      },

      /*
        ORGANIZATION
      */
      {
        "@type": "Organization",

        name: "PAN Journey",

        url: siteUrl,
      },
    ],
  };

  const initialSearchData = {
    city: cityName || "",

    cityData: {
      id: cityId || "",
    },

    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
    pets: false,
  };

  /*
  FAQ SCHEMA
*/
  const faqBlock = cms?.data?.blocks?.find((b) => b?.type === "faq");

  console.log("FAQ BLOCK:", faqBlock);

  const faqItems = faqBlock?.data?.items || faqBlock?.data?.faqs || [];

  if (faqItems.length) {
    schema["@graph"].push({
      "@type": "FAQPage",

      mainEntity: faqItems.map((item) => ({
        "@type": "Question",

        name: item?.question || "",

        acceptedAnswer: {
          "@type": "Answer",

          text: item?.answer || "",
        },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <HotelContent initialSearchData={initialSearchData} cms={cms} />

      {/* CITY CMS */}

      {cms && <CMSContentRenderer cms={cms} />}
    </>
  );
}
