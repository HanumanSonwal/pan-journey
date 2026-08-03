// import Image from "next/image";

// export default function GiftCard({ card }) {
//   return (
//     <div className="bg-[#f7f7f7] rounded-[18px] overflow-hidden shadow-md p-3 md:p-2 lg:p-4 hover:shadow-xl transition-all duration-300">
//       {/* Image */}
//       <div className="relative w-full h-[140px] sm:h-[140px] md:h-[120px] lg:h-[170px]">
//         <Image
//           src={card.image}
//           alt={card.title}
//           fill
//           className="object-cover rounded-md"
//         />
//       </div>

//       {/* Title */}
//       <h3 className="mt-2 text-[15px] md:text-[14px] lg:text-[17px] font-medium text-[#444] leading-tight">
//         {card.title}
//       </h3>

//       {/* Price */}
//       <p className="mt-1 text-[16px] md:text-[15px] lg:text-[20px] font-bold text-black">
//         ₹ {card.price}
//       </p>

//       {/* Offer Text */}
//       <p className="mt-1 text-[11px] md:text-[10px] lg:text-[12px] leading-[1.4]">
//         <span className="text-[#138a63] font-semibold">
//           Hurry Up
//         </span>{" "}
//         <span className="text-red-500 font-semibold">
//           {card.discount}% Off
//         </span>{" "}
//         <span className="text-[#138a63] font-semibold">
//           on {card.title}
//         </span>
//       </p>

//       {/* Button */}
//       <button className="w-full h-[36px] md:h-[34px] lg:h-[42px] mt-2 rounded-md !text-white text-[13px] md:text-[12px] lg:text-[16px] font-medium bg-gradient-to-b from-[#6bbbe6] to-[#006d7d] hover:opacity-90 transition">
//         Get Offer
//       </button>
//     </div>
//   );
// }

import { BadgeIndianRupee, CalendarDays, TicketPercent } from "lucide-react";
import Image from "next/image";

export default function GiftCard({ card }) {
  const startDate = new Date(card.validity?.startDate).toLocaleDateString(
    "en-IN",
  );

  const endDate = new Date(card.validity?.endDate).toLocaleDateString("en-IN");

  return (
    <div className="group overflow-hidden rounded-xl border border-[#dfeaf2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-[180px] overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 shadow-md backdrop-blur">
          <span className="font-roboto text-[13px] font-bold most-text-color">
            {card.discountType === "flat"
              ? `₹${card.discountValue} OFF`
              : `${card.discountValue}% OFF`}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Title */}
        <h3 className="font-roboto text-[20px] font-semibold text-[#1f2937]">
          {card.title}
        </h3>

        {/* Coupon */}
        <div className="flex items-center justify-between rounded-xl border border-dashed most-boder-colour  px-4 py-3">
          <span className="font-roboto text-[13px] text-gray-500">
            Coupon Code
          </span>

          <span className="font-roboto text-[15px] font-bold tracking-wider most-text-color">
            {card.code}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <BadgeIndianRupee size={18} className="text-[#0b8f67]" />

            <span className="font-roboto">
              Minimum Booking :
              <span className="ml-1 font-semibold text-[#222]">
                ₹{card.minAmount}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <CalendarDays size={18} className="text-[#0b8f67]" />

            <span className="font-roboto">
              {startDate} - {endDate}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[14px] text-gray-600">
            <TicketPercent size={18} className="text-[#0b8f67]" />

            <span className="font-roboto">
              Applicable on{" "}
              <span className="font-semibold capitalize">
                {card.applicableModules?.join(", ")}
              </span>
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          disabled={card.comingSoon}
          className={`font-roboto h-[48px] w-full rounded-xl text-[15px] font-medium text-white! transition-all duration-300 ${card.comingSoon
            ? "cursor-not-allowed bg-gray-400"
            : "buttion-background-color hover:shadow-lg hover:brightness-110"
            }`}
        >
          {card.comingSoon ? "Coming Soon" : "Claim Offer"}
        </button>
      </div>
    </div>
  );
}
