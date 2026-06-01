import {
  buildHotelDescription,
  buildHotelKeywords,
  buildHotelTitle,
} from "@/modules/cms/seo/cmsDynamicSeo";
import { buildCmsMetadata } from "@/modules/cms/seo/cmsSeo";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";
import HotelContent from "@/modules/hotel/pages/Hotel";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const query = await searchParams;
  const preview = query?.preview === "true";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const rawCity = query?.city || "";

  const cityName = rawCity?.split(",")?.[0]?.trim() || "Hotels";

  /*
    CITY SLUG
  */
  const citySlug = cityName
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.replace(/\s+/g, "-");

  /*
    CMS FETCH
  */
  const cms = citySlug ? await fetchCmsBySlug(citySlug) : null;

  /*
    CMS SEO
  */
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
  /*
    DEFAULT SEO
  */
  const canonical = citySlug
    ? `${siteUrl}/hotels/${citySlug}`
    : `${siteUrl}/hotels`;

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

    openGraph: {
      title: buildHotelTitle(cityName),

      description: buildHotelDescription(cityName),

      url: canonical,
      siteName: "PAN Journey",
      type: "website",
    },
  };
}

export default async function Page({ searchParams }) {
  const query = await searchParams;

  const rawCity = query?.city || "";

  const cityName = rawCity?.split(",")?.[0]?.trim() || "";

  /*
    CITY SLUG
  */
  const citySlug = cityName
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.replace(/\s+/g, "-");

  /*
    CMS FETCH
  */
  const cms = citySlug ? await fetchCmsBySlug(citySlug) : null;

  console.log("SEARCH PAGE CMS:", cms);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelContent cms={cms} />
    </Suspense>
  );
}
