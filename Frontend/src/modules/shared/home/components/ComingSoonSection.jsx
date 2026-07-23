"use client";

import { Card } from "antd";
import Image from "next/image";

import bookingData from "./data/Busflightherodata";

export default function ComingSoonSection() {
  return (
    <section className="mt-[-10px] overflow-hidden bg-[#EDF7FF] !px-0 sm:!px-0 md:!px-1 lg:!px-1 xl:!px-1 2xl:!px-0 md:pt-12  lg:pt-16">
      <div className="mx-auto w-full  px-1 sm:px-2 lg:w-[87%] xl:w-[86.72%]">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:gap-10">
          {bookingData.map((item) => (
            <div key={item.id} className="relative">
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden rounded-xl sm:h-[280px] md:h-[340px] lg:h-[400px] lg:rounded-2xl xl:h-[440px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Coming Soon Tag */}
                <div className="absolute top-0 left-0 z-10">
                  <span className="rounded-br-xl teb-gradient  px-3 py-2 text-[11px] text-white sm:px-4 sm:py-2 sm:text-sm lg:px-5 lg:py-3 lg:text-base">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Floating Card */}
              <Card
                rootClassName="absolute left-1/2 bottom-4 sm:bottom-8 md:bottom-10 lg:bottom-14 xl:bottom-16 w-[92%] sm:w-[88%] md:w-[84%] lg:w-[82%] -translate-x-1/2 rounded-xl lg:rounded-2xl border-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                styles={{
                  body: {
                    padding: "18px 16px",
                  },
                }}
              >
                <div className="text-center">
                  <h3 className="text-lg leading-tight font-bold text-[#222] sm:text-xl lg:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600 sm:mt-3 sm:text-sm lg:mt-4 lg:text-[15px]">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
