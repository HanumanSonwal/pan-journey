"use client";

import { useRouter } from "next/navigation";

export default function BackgroundSection() {
  const router = useRouter();

  return (
    <div className="relative left-1/2  min-h-[150px] w-screen -translate-x-1/2 bg-[#76B7E5]">
      <div className="mx-auto max-w-7xl px-6 pt-10 !z-0">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="font-roboto! flex cursor-pointer items-center gap-2 !text-[23px] font-semibold !text-white"
        >
          ← Back
        </button>

        {/* Dashed Line */}
        <div className="mt-[2px] w-24 border-b border-dashed border-white"></div>
      </div>
    </div>
  );
}
