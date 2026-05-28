import HotelContent from "@/modules/hotel/pages/Hotel";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const query = await searchParams;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const rawCity = query?.city || "";

  const cityName = rawCity?.split(",")?.[0]?.trim() || "Hotels";

  /*
  SLUG
  */
  const citySlug = cityName
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.replace(/\s+/g, "-");

  /*
  CANONICAL -> SEO PAGE
  */
  const canonical = citySlug
    ? `${siteUrl}/hotels/${citySlug}`
    : `${siteUrl}/hotels`;

  return {
    metadataBase: new URL(siteUrl),

    title: `Hotels in ${cityName} | PAN Journey`,

    description: `Search hotels in ${cityName} with verified listings, best prices and travel insights on PAN Journey.`,

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
      description: `Search hotels in ${cityName} with verified listings and best prices.`,
      url: canonical,
      siteName: "PAN Journey",
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelContent />
    </Suspense>
  );
}
