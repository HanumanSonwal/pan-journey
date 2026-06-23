"use client";

import SectionHeading from "@/components/common/SectionHeading";
import {
  CustomerServiceOutlined,
  DollarOutlined,
  GiftOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const features = [
  {
    icon: <DollarOutlined />,
    title: "Best Price Guarantee",
    description:
      "Get the most competitive prices with complete transparency and zero hidden charges.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Easy & Secure Booking",
    description:
      "Enjoy a smooth booking experience with trusted and secure payment methods.",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help whenever you need assistance.",
  },
  {
    icon: <GiftOutlined />,
    title: "Instant Cashback Rewards",
    description:
      "Earn exciting rewards and cashback benefits on every successful booking.",
  },
];

export default function WhySection() {
  return (
    <section className="mt-[-10px] overflow-hidden bg-[#EDF7FF] px-4 py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1650px] px-2 sm:px-4 lg:w-[86%] lg:px-0 mt-0 sm:mt-2 md:mt-4 lg:-mt-20 xl:mt-4">
        {/* Heading */}
        <SectionHeading
          title="Why Choose Our Platform"
          description="We’re committed to offering more than just products we provide exceptional experiences."
        />

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr] xl:gap-10">
          {/* Left Image */}
          <div
            className="
relative
min-h-[240px]
sm:min-h-[320px]
md:min-h-[420px]
lg:min-h-[520px]
xl:min-h-[600px]
overflow-hidden
rounded-2xl
lg:rounded-[32px]
shadow-xl
"
          >
            <Image
              src="/images/whySection.png"
              alt="Luxury Resort"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

            {/* Floating Card */}
            <div
              className="
absolute
left-3
right-3
bottom-3
sm:left-5
sm:right-auto
sm:bottom-5
rounded-xl
lg:rounded-2xl
border
border-white/40
bg-white/95
px-4
py-3
sm:px-5
sm:py-4
shadow-2xl
backdrop-blur-md
w-auto
sm:w-fit
"
            >
              <p className="text-sm font-medium text-gray-500">
                Trusted by thousands of travelers
              </p>

              <div className="mt-1 flex items-center gap-3">
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">4.9★</h4>

                <div className="h-10 w-[1px] bg-gray-200" />

                <p className="text-xs sm:text-sm lg:text-base leading-5 text-gray-600">
                  Rated highly for service,
                  <br />
                  pricing & customer support
                </p>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="
group
flex
flex-col
rounded-2xl
lg:rounded-[28px]
border
border-white/60
bg-white
p-5
sm:p-6
lg:p-7
shadow-[0_10px_35px_rgba(59,130,182,0.08)]
transition-all
duration-300
hover:-translate-y-1
hover:shadow-[0_20px_45px_rgba(59,130,182,0.15)]
"
              >
                {/* Icon */}
                <div
                  className="
mb-4
flex
h-12
w-12
sm:h-14
sm:w-14
lg:h-16
lg:w-16
items-center
justify-center
rounded-xl
lg:rounded-2xl
border
border-[#D9ECF8]
bg-[#EDF7FF]
text-[20px]
sm:text-[24px]
lg:text-[28px]
text-[#3B82B6]
transition-transform
group-hover:scale-110
"
                >
                  {item.icon}
                </div>

                {/* Content */}
                <h3
                  className="
mb-2
text-lg
sm:text-xl
lg:text-2xl
font-bold
leading-snug
text-gray-900
"
                >
                  {item.title}
                </h3>

                <p
                  className="
text-sm
sm:text-[15px]
lg:text-base
leading-6
text-gray-600
"
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
