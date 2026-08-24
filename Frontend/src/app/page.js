import Herobanner from "@/modules/shared/home/components/cashback_sections/OfferBanner";
import ComingSoonSection from "@/modules/shared/home/components/ComingSoonSection";
import DestinationsSection from "@/modules/shared/home/components/DestinationsSection";
import NewsletterSection from "@/modules/shared/home/components/NewsletterSection";
import TestimonialsSection from "@/modules/shared/home/components/TestimonialsSection";
import TopRatedHotels from "@/modules/shared/home/components/TopRatedHotels";
import VacationSection from "@/modules/shared/home/components/vacation_sections/VacationSection";
import WhySection from "@/modules/shared/home/components/why_sections/WhySection";

import CMSContentRenderer from "@/modules/cms/renderer/CMSContentRenderer";
import { fetchCmsBySlug } from "@/modules/cms/services/cmsFetch";

import ScrollToTopButton from "@/modules/hotel/ScrollToTopButton";

import GiftCardSlider from "@/modules/shared/home/components/hero_section/GiftCardSlider";
import Hero from "@/modules/shared/home/components/hero_section/Hero";
import TrustSection from "@/modules/shared/home/components/hero_section/TrustSection";

import { fetchHomeContent } from "@/modules/shared/home/services/homeContentFetch";

const SITE_URL = process.env.NEXTAUTH_URL || "https://panjourney.com";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                   */
/* -------------------------------------------------------------------------- */

export async function generateMetadata() {
  const homeCms = await fetchCmsBySlug("home");

  const title =
    homeCms?.metaTitle ||
    "PAN Journey – Book Hotels, Flights & Travel Deals Online";

  const description =
    homeCms?.metaDescription ||
    "Book hotels, flights and travel packages with PAN Journey.";

  const keywords = Array.isArray(homeCms?.keywords)
    ? homeCms.keywords.join(", ")
    : homeCms?.keywords;

  return {
    title,
    description,
    keywords,

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: SITE_URL,
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

    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "PAN Journey",
      type: "website",
      locale: "en_IN",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Home Page                                                                  */
/* -------------------------------------------------------------------------- */

export default async function Page() {
  /*
   * Fetch both resources in parallel.
   *
   * fetchCmsBySlug is wrapped with React cache()
   * so generateMetadata() and Page() can reuse the
   * same CMS request within the same render/request.
   */
  const [homeCms, homeContent] = await Promise.all([
    fetchCmsBySlug("home"),
    fetchHomeContent(),
  ]);

  const { banner, placesAsPerYourVibe, topRatedHotels, popularDestinations } =
    homeContent ?? {};

  /* ------------------------------------------------------------------------ */
  /* FAQ Schema                                                               */
  /* ------------------------------------------------------------------------ */

  const faqBlock = homeCms?.data?.blocks?.find((block) => block.type === "faq");

  const faqItems = faqBlock?.data?.items ?? [];

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  /* ------------------------------------------------------------------------ */
  /* Website Schema                                                           */
  /* ------------------------------------------------------------------------ */

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PAN Journey",
    url: SITE_URL,

    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/hotels?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  /* ------------------------------------------------------------------------ */
  /* Organization Schema                                                      */
  /* ------------------------------------------------------------------------ */

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PAN Journey",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Structured Data                                                    */}
      {/* ------------------------------------------------------------------ */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchema),
        }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Home Page Sections                                                 */}
      {/* ------------------------------------------------------------------ */}

      <ScrollToTopButton />

      <Hero banner={banner} />

      <TrustSection />

      <GiftCardSlider />

      <VacationSection vibes={placesAsPerYourVibe} />

      <Herobanner />

      <WhySection />

      <TopRatedHotels hotels={topRatedHotels} />

      <ComingSoonSection />

      <TestimonialsSection />

      <DestinationsSection destinations={popularDestinations} />

      {homeCms && <CMSContentRenderer cms={homeCms} />}

      <NewsletterSection />
    </>
  );
}
