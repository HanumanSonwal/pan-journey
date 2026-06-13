import { giftCards } from "@/modules/shared/home/components/data/giftCards";
import GiftCard from "./GiftCard";

export default function GiftCardsSection() {
  return (
    <section className="bg-black py-10 sm:py-12 lg:py-16 !bg-[#eef5fa] ">
      <div className="max-w-[1300px] mx-auto px-3 sm:px-4 md:px-3 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[700px]:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-3 lg:gap-6">
          {giftCards.map((card) => (
            <GiftCard
              key={card.id}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}