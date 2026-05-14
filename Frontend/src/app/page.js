import Herobanner from "@/modules/shared/home/components/cashback_sections/OfferBanner";
import Hero from "@/modules/shared/home/components/hero_section/Hero";

import ComingSoonSection from "@/modules/shared/home/components/ComingSoonSection";
import FAQSection from "@/modules/shared/home/components/FAQSection";
import NewsletterSection from "@/modules/shared/home/components/NewsletterSection";
import TestimonialsSection from "@/modules/shared/home/components/TestimonialsSection";
import TopRatedHotels from "@/modules/shared/home/components/TopRatedHotels";
import VacationSection from "@/modules/shared/home/components/vacation_sections/VacationSection";
import WhySection from "@/modules/shared/home/components/why_sections/WhySection";
import DestinationsSection from "@/modules/shared/home/components/DestinationsSection";

export default function Page() {
  return (
    <>
      <Hero />
      <VacationSection />
      <Herobanner />
      <WhySection />
      <TopRatedHotels />
      <ComingSoonSection />
      <TestimonialsSection />
      <DestinationsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
