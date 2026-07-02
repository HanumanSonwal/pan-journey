"use client";

import Link from "next/link";

export default function FooterBottom() {
  return (
    <div className="mt-10 border-t border-gray-300 py-2 font-semibold">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="mb-0! text-sm">
          © {new Date().getFullYear()} PAN Journey. All Rights Reserved.
        </p>

        <div className="flex flex-wrap gap-5 text-sm">
          <Link
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
            href="/privacy-policy"
          >
            Terms & Conditions
          </Link>
          <Link
            className="relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0f766e] after:transition-all after:duration-300 hover:text-[#0f766e] hover:after:w-full"
            href="/refund-policy"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
