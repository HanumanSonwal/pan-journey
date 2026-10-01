import BusSearchHero from "@/modules/hotel/components/buss/Buss";
import TrustSection from "@/modules/shared/home/components/hero_section/TrustSection";

export default function BusPage() {
  return (
    <>
      <BusSearchHero />
      <div className="-mt-33 mb-27">
        <TrustSection />
      </div>
    </>
  );
}
