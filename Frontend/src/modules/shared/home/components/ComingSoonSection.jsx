"use client";

import { Card } from "antd";
import Image from "next/image";

import bookingData from "./data/Busflightherodata";

export default function ComingSoonSection() {
  return (
    <section className="mt-[-10px] overflow-hidden !bg-[#EDF7FF] px-4 md:pt-15">
      <div className="mx-auto ml-25 w-[88.72%] md:ml-4 md:w-[95%] lg:ml-25 lg:w-[87%]">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-12">
          {bookingData.map((item) => (
            <div key={item.id} className="relative">
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden rounded-[16px] sm:h-[380px] md:h-[420px]">
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
                  <span className="rounded-br-[12px] bg-[#49A6C9] px-5 py-3 text-sm text-white sm:text-base">
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Floating Card */}
              <Card
                rootClassName="absolute left-1/2 -translate-x-1/2 bottom-20 w-[82%] rounded-[14px] border-0 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                styles={{
                  body: {
                    padding: "28px 24px",
                  },
                }}
              >
                <div className="text-center">
                  <h3 className="text-[22px] leading-tight font-bold text-[#222]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[13px] text-gray-600">{item.desc}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
