"use client";

export default function AboutHero() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[280px] sm:h-[320px] md:h-[200px] lg:h-[300px] xl:h-[400px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(207, 207, 207, 0.8) 0%,
              rgba(255, 255, 255, 0.45) 45%,
              rgba(255, 255, 255, 0) 100%
            ),
            url('/images/aboutheroimage.jpg')
          `,
        }}
      >
        <div className="absolute left-4 sm:left-8 lg:left-[8%] top-1/2 z-10 max-w-[700px] -translate-y-1/2">
          <h1 className="mb-2 text-[32px] font-bold leading-tight text-[#222] sm:text-[32px] md:text-[24px] lg:text-[30px] xl:text-[40px]">
            About Us
          </h1>

          <p className="max-w-[550px] text-[14px] leading-relaxed text-black sm:text-[16px] md:text-[14px] lg:text-[16px]">
            We’re committed to offering more than just
            <br />
            products—we provide exceptional experiences.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="bg-[#eef3f8] py-10 md:py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-18 xl:px-23 2xl:px-33
">
          <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-2 w-full">

            {/* Left Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/aboutsection.jpg"
                alt="PanJourney"
                className="h-[260px] w-full object-cover rounded-2xl sm:h-[230px] md:h-[320px] lg:h-[400px] transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Right Content */}
            <div>
              <span className="mb-3 block text-base font-medium text-sky-600 sm:text-lg">
                PanJourney
              </span>

              <h2 className="mb-4 text-[28px] font-bold text-gray-900 sm:text-[36px] md:text-[42px] lg:text-[52px]">
                Know PanJourney
              </h2>



              <p className="mt-4 text-[15px] leading-7 text-gray-600 sm:text-[10px] md:text-[13px] lg:text-[15px]">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}