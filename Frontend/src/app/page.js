import BussflightCards from "@/modules/shared/home/components/BussflightCards";
import Feselity from "@/modules/shared/home/components/Feselity";
import Hero from "@/modules/shared/home/components/Hero";
import Herobanner from "@/modules/shared/home/components/Herobanner";
import HotelCategory from "@/modules/shared/home/components/HotelCategory";

import TopRatedHotels from "@/modules/shared/home/components/TopRated";

export default function Page() {
  return (
    <>
      <Hero />
      <HotelCategory />
      <Herobanner />
      <Feselity />
      <TopRatedHotels />
      <BussflightCards />
    </>
  );
}
