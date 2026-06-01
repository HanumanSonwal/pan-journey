import CMSContentRenderer from "@/modules/cms/components/renderer/CMSContentRenderer";
import Herobanner from "@/modules/shared/home/components/cashback_sections/OfferBanner";
import NewsletterSection from "@/modules/shared/home/components/NewsletterSection";
import TestimonialsSection from "@/modules/shared/home/components/TestimonialsSection";
import WhySection from "@/modules/shared/home/components/why_sections/WhySection";
import AboutContent from "@/modules/shared/pages/about-us/AboutContent";
import AboutHero from "@/modules/shared/pages/about-us/AboutHero";
import JourneySection from "@/modules/shared/pages/about-us/JourneySection";

export default function aboutusPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <JourneySection />
      <WhySection />
      <Herobanner />
      <div className="mt-20 ">
        <TestimonialsSection />
      </div>
     
      <NewsletterSection />
    </>
  );
}