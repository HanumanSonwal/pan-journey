"use client";

import { Card } from "antd";
import Image from "next/image";

import bookingData from "../components/data/Busflightherodata";

export default function ComingSoonModulesSection() {
  return (
    <section className="bg-[#F3F4F6]  md:pt-15 px-4 overflow-hidden">
      <div className=" !w-[88.72%] mx-auto  ml-25">
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 ">
          {bookingData.map((item) => (
            <div key={item.id} className="relative">
              
              {/* Image */}
              <div className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-[16px] overflow-hidden">
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
                  <span className="bg-[#49A6C9] text-white text-sm sm:text-base px-5 py-3 rounded-br-[12px]">
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

                  <p className="text-gray-600 text-[13px]  mt-4">
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