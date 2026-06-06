"use client";

import { useRouter } from "next/navigation";

export default function BackgroundSection() {
  const router = useRouter();

  return (
    <div className="relative w-screen min-h-[150px] bg-[#76B7E5] left-1/2 -translate-x-1/2 -mt-8">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 !text-white !text-[23px] font-semibold cursor-pointer"
        >
          ← Back
        </button>

        {/* Dashed Line */}
        <div className="mt-[2px] w-24 border-b border-dashed border-white"></div>
      </div>
    </div>
  );
}