import BussflightCards from "@/modules/shared/home/components/BussflightCards";
import Feselity from "@/modules/shared/home/components/WhySection";
import Hero from "@/modules/shared/home/components/Hero";
import Herobanner from "@/modules/shared/home/components/Herobanner";
import HotelCategory from "@/modules/shared/home/components/HotelCategory";

import TopRatedHotels from "@/modules/shared/home/components/TopRated";
import TestimonialsSection from "@/modules/shared/home/components/TestimonialsSection";
import DestinationsSection from "@/modules/shared/home/components/DestinationsSection";
import FAQSection from "@/modules/shared/home/components/FAQSection";
import NewsletterSection from "@/modules/shared/home/components/NewsletterSection";

export default function Page() {
  return (
    <>
      <Hero />
      <HotelCategory />
      <Herobanner />
      <Feselity />
      <TopRatedHotels />
      <BussflightCards />
      <TestimonialsSection/>
      <DestinationsSection/>
      <FAQSection/>
    <NewsletterSection/>
    </>
  );
}
