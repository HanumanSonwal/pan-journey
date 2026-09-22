"use client";
import { useRouter } from "next/navigation";

export default function BackgroundSection() {
  const router = useRouter();

  return (
    <div className="box-background-color min-h-[150px] w-full overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="font-roboto! flex cursor-pointer items-center gap-2 !text-[20px] font-semibold !text-white sm:!text-[23px]"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
        <div className="mt-[2px] w-20 border-b border-dashed border-white sm:w-24" />
      </div>
    </div>
  );
}
