"use client";

import { Card } from "antd";
import Image from "next/image";

import bookingData from "./data/Busflightherodata";

export default function ComingSoonSection() {
  return (
    <section className="mt-[-10px] overflow-hidden bg-[#EDF7FF] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 pt-8 md:pt-12 lg:pt-16">
      <div className="mx-auto w-full max-w-[1600px] px-1 sm:px-2 lg:w-[87%] xl:w-[86.72%]">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 xl:gap-10">
          {bookingData.map((item) => (
            <div key={item.id} className="relative">
              {/* Image */}
              <div
                className="
relative
h-[220px]
sm:h-[280px]
md:h-[340px]
lg:h-[400px]
xl:h-[440px]
overflow-hidden
rounded-xl
lg:rounded-2xl
"
              >
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
                  <span
                    className="
rounded-br-xl
bg-[#49A6C9]
px-3
py-2
sm:px-4
sm:py-2
lg:px-5
lg:py-3
text-[11px]
sm:text-sm
lg:text-base
text-white
"
                  >
                    Coming Soon
                  </span>
                </div>
              </div>

              {/* Floating Card */}
              <Card
                rootClassName="
absolute
left-1/2
bottom-4
sm:bottom-8
md:bottom-10
lg:bottom-14
-xl:bottom-16
-w-[92%]
sm:w-[88%]
md:w-[84%]
lg:w-[82%]
-translate-x-1/2
rounded-xl
lg:rounded-2xl
border-0
shadow-[0_8px_30px_rgba(0,0,0,0.12)]
"
                styles={{
                  body: {
                    padding: "18px 16px",
                  },
                }}
              >
                <div className="text-center">
                  <h3
                    className="
text-lg
sm:text-xl
lg:text-2xl
font-bold
leading-tight
text-[#222]
"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
mt-2
sm:mt-3
lg:mt-4
text-xs
sm:text-sm
lg:text-[15px]
leading-5
text-gray-600
"
                  >{item.desc}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
