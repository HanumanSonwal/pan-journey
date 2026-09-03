import {
  buildHotelDescription,
  buildHotelKeywords,
  buildHotelTitle,
} from "@/modules/cms/seo/cmsDynamicSeo";
import { buildCmsMetadata } from "@/modules/cms/seo/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelContent from "@/modules/hotel/pages/Hotel";
import { searchDestinationServer } from "@/modules/hotel/services/search.server";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

const formatCityName = (value = "") => {
  return (
    value
      ?.replace(/-/g, " ")
      ?.replace(/\b\w/g, (letter) => letter.toUpperCase()) || ""
  );
};

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;

  const preview = query?.preview === "true";

  const cms = await fetchCmsBySlug(slug, preview);

  if (cms) {
    const metadata = buildCmsMetadata(cms);

    if (preview) {
      metadata.robots = {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      };
    }

    return metadata;
  }

  const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const cityName = formatCityName(slug) || "Hotels";
  const canonical = `${siteUrl}/hotels/${slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: buildHotelTitle(cityName),
    description: buildHotelDescription(cityName),
    keywords: buildHotelKeywords(cityName),
    alternates: {
      canonical,
    },

    robots: {
      index: false,
      follow: false,
      nocache: true,

      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-image-preview": "none",
        "max-snippet": -1,
      },
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
  const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const cms = await fetchCmsBySlug(slug, preview);

  let cityName = formatCityName(slug);
  let cityData = null;

  if (cms && cms?.data?.cityMeta?.destinationId) {
    const cityMeta = cms?.data?.cityMeta || {};

    cityName = cityMeta?.destination || cityName;
    cityData = {
      id: cityMeta?.destinationId || "",
      name: cityName || "",
      type: "city",
      city: cityName || "",
      state: cityMeta?.stateName || "",
      stateName: cityMeta?.stateName || "",
      country: cityMeta?.country || "",
      countryCode: cityMeta?.countryCode || "",
      displayName: [cityName, cityMeta?.stateName, cityMeta?.country]
        .filter(Boolean)
        .join(","),

      normalizedCity: cityName || "",
    };
  } else {
    const destinations = await searchDestinationServer(cityName);
    const matchedCity =
      destinations?.find(
        (item) =>
          item?.type?.toLowerCase() === "city" &&
          item?.city?.toLowerCase() === cityName?.toLowerCase(),
      ) ||
      destinations?.find((item) => item?.type?.toLowerCase() === "city") ||
      destinations?.[0];

    if (!matchedCity) {
      notFound();
    }

    cityName = matchedCity?.city || matchedCity?.name || cityName;
    cityData = {
      id: matchedCity?.id || "",
      name: matchedCity?.name || cityName,
      type: matchedCity?.type || "city",
      city: matchedCity?.city || cityName,
      state: matchedCity?.state || "",
      stateName: matchedCity?.state || "",
      country: matchedCity?.country || "",
      countryCode: matchedCity?.countryCode || "",
      displayName:
        matchedCity?.displayName ||
        [
          matchedCity?.name || cityName,
          matchedCity?.state,
          matchedCity?.country,
        ]
          .filter(Boolean)
          .join(","),

      normalizedCity: matchedCity?.city || matchedCity?.name || cityName,
    };

    if (!cityData?.id) {
      notFound();
    }
  }

  const initialSearchData = {
    city: cityData?.displayName || cityName || "",
    cityData: {
      id: cityData?.id || "",
      name: cityData?.name || cityName || "",
      type: cityData?.type || "city",
      city: cityData?.city || cityName || "",
      state: cityData?.state || "",
      stateName: cityData?.stateName || cityData?.state || "",
      country: cityData?.country || "",
      countryCode: cityData?.countryCode || "",
      displayName: cityData?.displayName || cityName || "",
      normalizedCity: cityData?.normalizedCity || cityName || "",
    },

    checkIn: dayjs().format("YYYY-MM-DD"),
    checkOut: dayjs().add(1, "day").format("YYYY-MM-DD"),
    rooms: 1,
    adults: 2,
    children: 0,
    childAges: [],
    pets: false,
  };

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

  const faqBlock = cms?.data?.blocks?.find((block) => block?.type === "faq");
  let faqItems = faqBlock?.data?.items || faqBlock?.data?.faqs || [];

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
        isValidCity={!!cityData?.id}
      />
    </>
  );
}
