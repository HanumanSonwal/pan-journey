import {
  buildHotelDescription,
  buildHotelKeywords,
  buildHotelTitle,
} from "@/modules/cms/seo/cmsDynamicSeo";
import { buildCmsMetadata } from "@/modules/cms/seo/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelContent from "@/modules/hotel/pages/Hotel";
import { searchDestinationServer } from "@/modules/hotel/services/search.server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;
  const preview = query?.preview === "true";
  const cms = await fetchCmsBySlug(slug, preview);
  console.log("METADATA PREVIEW:", preview);

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
    title: buildHotelTitle(cityName),
    description: buildHotelDescription(cityName),
    keywords: buildHotelKeywords(cityName),
    alternates: {
      canonical,
    },

    robots: preview
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
      title: buildHotelTitle(cityName),
      description: buildHotelDescription(cityName),
      url: canonical,
      siteName: "PAN Journey",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: buildHotelTitle(cityName),
      description: buildHotelDescription(cityName),
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;

  const query = await searchParams;
  const preview = query?.preview === "true";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const cms = await fetchCmsBySlug(slug, preview);

  console.log("PAGE PREVIEW:", preview);

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

    console.log("DESTINATIONS in man page :", destinations);

    const matchedCity = destinations?.[0];

    cityName = matchedCity?.destination || cityName;

    cityId = matchedCity?.id || "";
    if (!cms && !cityId) {
      notFound();
    }
  }

  /*
    CITY SCHEMA
  */
  const schema = {
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
            name: cityName,
            item: `${siteUrl}/hotels/${slug}`,
          },
        ],
      },

      {
        "@type": "CollectionPage",

        name: `Hotels in ${cityName}`,

        url: `${siteUrl}/hotels/${slug}`,

        description:
          cms?.metaDescription ||
          `Find hotels in ${cityName} with best prices on PAN Journey.`,
      },

      {
        "@type": "Organization",

        name: "PAN Journey",

        url: siteUrl,
      },
    ],
  };

  const dayjs = require("dayjs");

  const initialSearchData = {
    city: cityName || "",

    cityData: {
      id: cityId || "",

      stateName: cms?.data?.cityMeta?.stateName || "",

      countryCode: cms?.data?.cityMeta?.countryCode || "",
    },

    checkIn: dayjs().format("YYYY-MM-DD"),

    checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),

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

  let faqItems = faqBlock?.data?.items || faqBlock?.data?.faqs || [];

  /*
  FALLBACK FAQ
*/
  if (!faqItems.length) {
    faqItems = [
      {
        question: `What are the best areas to stay in ${cityName}?`,
        answer: `The best area depends on your travel needs, budget and nearby attractions in ${cityName}.`,
      },
      {
        question: `When should I book hotels in ${cityName}?`,
        answer: `Booking early is generally recommended during weekends, holidays and peak travel seasons.`,
      },
    ];
  }

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

      <HotelContent
        initialSearchData={initialSearchData}
        cms={cms}
        isValidCity={!!cityId}
      />
    </>
  );
}
