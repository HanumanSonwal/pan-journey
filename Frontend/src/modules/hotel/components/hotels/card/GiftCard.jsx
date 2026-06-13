import Image from "next/image";

export default function GiftCard({ card }) {
  return (
    <div className="bg-[#f7f7f7] rounded-[18px] overflow-hidden shadow-md p-3 md:p-2 lg:p-4 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-[140px] sm:h-[140px] md:h-[120px] lg:h-[170px]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 text-[15px] md:text-[14px] lg:text-[17px] font-medium text-[#444] leading-tight">
        {card.title}
      </h3>

      {/* Price */}
      <p className="mt-1 text-[16px] md:text-[15px] lg:text-[20px] font-bold text-black">
        ₹ {card.price}
      </p>

      {/* Offer Text */}
      <p className="mt-1 text-[11px] md:text-[10px] lg:text-[12px] leading-[1.4]">
        <span className="text-[#138a63] font-semibold">
          Hurry Up
        </span>{" "}
        <span className="text-red-500 font-semibold">
          {card.discount}% Off
        </span>{" "}
        <span className="text-[#138a63] font-semibold">
          on {card.title}
        </span>
      </p>

      {/* Button */}
      <button className="w-full h-[36px] md:h-[34px] lg:h-[42px] mt-2 rounded-md !text-white text-[13px] md:text-[12px] lg:text-[16px] font-medium bg-gradient-to-b from-[#6bbbe6] to-[#006d7d] hover:opacity-90 transition">
        Get Offer
      </button>
    </div>
  );
}