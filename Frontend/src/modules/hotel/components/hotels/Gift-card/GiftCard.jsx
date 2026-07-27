"use client";

import {
  BadgeIndianRupee,
  CalendarDays,
  Check,
  Copy,
  TicketPercent,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GiftCard({ card }) {
  const [copied, setCopied] = useState(false);

  const startDate = new Date(card.validity?.startDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  const endDate = new Date(card.validity?.endDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(card.code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const discountLabel =
    card.discountType === "flat"
      ? `Flat ₹${card.discountValue} OFF`
      : `Up to ${card.discountValue}% OFF`;

  return (
    <div className="group overflow-hidden rounded border border-[#E5EEF5] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
      {/* Image */}
      <div className="relative h-[170px] overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-[#0BA360] to-[#3CBA92] px-3 py-1 shadow-lg">
          <span className="font-roboto text-xs font-semibold text-white">
            {discountLabel}
          </span>
        </div>

        {/* Title */}
        <div className="absolute right-4 bottom-4 left-4 z-10">
          <h3 className="font-roboto text-lg font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {card.title}
          </h3>
        </div>
      </div>
      <div className="space-y-2 p-2">
        {/* Coupon */}
        <div className="flex items-center justify-between rounded border border-dashed border-[#00A3C8] bg-[#F2FBFE] px-2 py-2">
          <div>
            <p className="mb-0! font-mono text-[16px] font-bold tracking-[2px] text-[#006D7D]">
              {card.code}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg bg-[#006D7D] px-4 py-2 text-sm font-semibold text-white! transition hover:bg-[#005A66]"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2 rounded bg-[#FAFCFE] p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#E8F8FC] p-2">
                <BadgeIndianRupee size={18} className="text-[#0097B2]" />
              </div>

              <span className="font-roboto text-gray-600">Minimum Booking</span>
            </div>

            <span className="font-semibold text-[#111827]">
              ₹{card.minAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#E8F8FC] p-2">
                <CalendarDays size={18} className="text-[#0097B2]" />
              </div>

              <span className="font-roboto text-gray-600">Validity</span>
            </div>

            <div className="text-right">
              <p className="mb-0! text-[13px] font-semibold text-[#111827]">
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#E8F8FC] p-2">
                <TicketPercent size={18} className="text-[#0097B2]" />
              </div>

              <span className="font-roboto text-gray-600">Applicable On</span>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              {card.applicableModules?.map((module) => (
                <span
                  key={module}
                  className="rounded-full bg-[#EAF8FC] px-3 py-1 text-xs font-semibold text-[#00748A] capitalize"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={card.comingSoon}
          className={`font-roboto h-[52px] w-full rounded text-[16px] font-semibold text-white! transition-all duration-300 ${
            card.comingSoon
              ? "cursor-not-allowed bg-gray-400"
              : "bg-gradient-to-r from-[#6BC4F1] to-[#006D7D] hover:scale-[1.02] hover:shadow-xl active:scale-100"
          }`}
        >
          {card.comingSoon ? "Coming Soon" : "Claim Offer →"}
        </button>
      </div>
    </div>
  );
}
