import Home from "@/components/common/home";
// import Hero from "@/components/homepage/Hero";
import Hero from "@/modules/shared/home/components/Hero";
import Herobanner from "@/modules/shared/home/components/Herobanner";
import HotelCategory from "@/modules/shared/home/components/HotelCategory";
import Feselity from "@/modules/shared/home/components/Feselity";
import BussflightCards from "@/modules/shared/home/components/BussflightCards";
import Hotel from "@/modules/shared/home/components/Hotel";
     
  

import TopRatedHotels from "@/modules/shared/home/components/TopRated";

export default function Page() {
  return (
    <>
      <Hero />
      <HotelCategory />
      <Herobanner />
       <Feselity/>
        <TopRatedHotels/>
        <BussflightCards/>
        <Hotel/>
    </>
  );
}
