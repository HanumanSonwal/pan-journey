"use client";

import { Skeleton } from "antd";

export default function GiftCardSkeleton() {
  return (
    <div className="gift-card-skeleton-card w-full overflow-hidden rounded-[6px] border border-[#e7e7e7] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.10)]">
      {/* IMAGE */}

      <Skeleton.Node
        active
        className="!block !h-[100px] !w-full sm:!h-[125px] md:!h-[140px] lg:!h-[170px]"
      />

      {/* CONTENT */}

      <div className="bg-white px-[8px] pt-[6px] pb-[8px] sm:px-[9px]">
        {/* LABEL */}

        <Skeleton.Input
          active
          size="small"
          className="!mb-[5px] !h-[12px] !w-[95px]"
        />

        {/* OFFER */}

        <div className="mt-1">
          <Skeleton.Input active size="small" className="!h-[16px] !w-[85%]" />
        </div>

        {/* GIFT */}

        <div className="mt-1">
          <Skeleton.Input active size="small" className="!h-[13px] !w-[65px]" />
        </div>
      </div>
    </div>
  );
}
