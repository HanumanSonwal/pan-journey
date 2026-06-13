import {
  EnvironmentFilled,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";
import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="relative">
      {/* Hero Banner */}
      <div className="relative h-[321px] w-full overflow-hidden">
        <Image
          src="/images/concacthero.jpg"
          alt="Contact Banner"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10" />

        {/* Heading */}
        <div className="absolute left-6 md:left-12 lg:left-[120px] top-[110px] z-20">
          <h2 className="text-white text-[34px] md:text-[38px] lg:text-[42px] font-bold">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Background */}


      {/* Contact Cards */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[240px] z-30 w-full max-w-[1400px] px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-6">

          {/* Call Us */}
          <div className="bg-white rounded-md shadow-lg px-4 md:px-6 lg:px-8 py-8 min-h-[90px]">
            <div className="flex items-center gap-3 mb-5  md:mb-2 lg:mb-7">
              <PhoneFilled className="text-[20px] md:text-[26px] lg:text-[30px] !text-[#2f7d8c] relative -top-[1px] " />

              <h3 className="text-[16px] md:text-[20px] lg:text-[22px] font-normal text-[#2f7d8c] leading-none m-0">
                Call Us:
              </h3>
            </div>

            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#444]">
              1234567890 |
              12344567787
            </p>
          </div>

          {/* Mail Us */}
          <div className="bg-white rounded-md shadow-lg px-4 md:px-6 lg:px-8 py-8 min-h-[90px]">
            <div className="flex items-center gap-3  mb-5  md:mb-2 lg:mb-7">
              <MailFilled className="text-[20px] md:text-[24px] lg:text-[26px] !text-[#2f7d8c] relative -top-[1px]" />

              <h3 className="text-[16px] md:text-[20px] lg:text-[22px] font-normal text-[#2f7d8c] leading-none m-0">
                Mail Us:
              </h3>
            </div>

            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#444] break-all">
              contact@panjourney.com
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-md shadow-lg px-4 md:px-6 lg:px-8 py-8 min-h-[90px]">
            <div className="flex items-center gap-3  mb-5  md:mb-2 lg:mb-7">
              <EnvironmentFilled className="text-[20px] md:text-[24px] lg:text-[26px] !text-[#2f7d8c] relative -top-[1px]" />

              <h3 className="text-[16px] md:text-[20px] lg:text-[22px]  text-[#2f7d8c] leading-none  m-0">
                Address:
              </h3>
            </div>

            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-[#444] leading-relaxed">
              36 Single Street,

              Jaipur,

              Sector 3170 India.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}