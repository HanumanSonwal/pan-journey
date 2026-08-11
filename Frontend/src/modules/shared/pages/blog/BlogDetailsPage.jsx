"use client";

import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import NewsletterSection from "../../home/components/NewsletterSection";

const JaipurBlogPage = () => {
  const router = useRouter();

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Jaipur – The Pink City",
          text: "Discover Jaipur, the Pink City of India, its royal heritage, forts, palaces and colourful markets.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Share cancelled
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}

      <section className="relative overflow-hidden bg-[#092f49]">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=85"
            alt="Jaipur Pink City"
            className="h-full w-full object-cover opacity-35"
          />
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#06283d]/80" />

        {/* HERO CONTENT */}
        <div className="relative mx-auto flex min-h-[430px] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => router.push("/blog")}
            className="mb-8 flex w-fit items-center gap-2 border-0 bg-transparent p-0 text-sm font-semibold text-white/80 transition-all duration-200 hover:text-white"
          >
            <ArrowLeftOutlined />
            Back to Blogs
          </button>

          {/* CATEGORY */}

          <span className="w-fit rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
            Destinations
          </span>

          {/* TITLE */}

          <h1 className="mt-5 max-w-4xl text-[34px] leading-[1.15] font-bold tracking-tight text-white sm:text-[44px] lg:text-[54px]">
            Jaipur – The Pink City
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-5 max-w-3xl text-[14px] leading-7 text-white/75 sm:text-[16px]">
            Discover the royal charm of Jaipur, explore magnificent forts and
            palaces, colourful markets, rich culture and unforgettable
            experiences in the Pink City of India.
          </p>

          {/* META */}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] text-white/70">
            <span className="flex items-center gap-1.5">
              <CalendarOutlined />
              05 Aug 2026
            </span>

            <span className="flex items-center gap-1.5">
              <ClockCircleOutlined />6 min read
            </span>

            <span className="flex items-center gap-1.5">
              <EnvironmentOutlined />
              Jaipur, Rajasthan
            </span>

            <span className="flex items-center gap-1.5">
              <UserOutlined />
              Pan Journey
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN CONTENT                                                  */}
      {/* ============================================================ */}

      <main className="bg-[#f8fafc]">
        <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-0">
          <div className="gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* ====================================================== */}
            {/* ARTICLE                                                 */}
            {/* ====================================================== */}

            <article className="min-w-0 overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-[0_5px_22px_rgba(0,0,0,0.05)]">
              {/* MAIN IMAGE */}

              <div className="relative h-[250px] overflow-hidden sm:h-[400px] lg:h-[520px]">
                <img
                  src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85"
                  alt="Jaipur Pink City"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* ARTICLE CONTENT */}

              <div className="px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                {/* INTRO */}

                <p className="text-[17px] leading-8 font-medium text-[#374151] sm:text-[18px]">
                  Jaipur, popularly known as the Pink City, is one of the most
                  beautiful destinations in Rajasthan. The city is famous for
                  its royal palaces, magnificent forts, colourful markets,
                  traditional culture and delicious Rajasthani cuisine.
                </p>

                <div className="my-8 h-px bg-gray-100" />

                {/* ================================================== */}
                {/* SECTION 1                                            */}
                {/* ================================================== */}

                <section>
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    Discover the Royal Heritage of Jaipur
                  </h2>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Jaipur is a perfect destination for travellers who want to
                    experience the royal history of Rajasthan. The city was
                    founded by Maharaja Sawai Jai Singh II and is known for its
                    impressive architecture and planned streets.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Walking through the old city, you can see beautiful pink
                    buildings, traditional shops, local markets and historic
                    landmarks that tell the story of Rajasthan's royal past.
                  </p>
                </section>

                {/* ================================================== */}
                {/* SECTION 2                                            */}
                {/* ================================================== */}

                <section className="mt-10">
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    Amber Fort
                  </h2>

                  <div className="mt-5 overflow-hidden rounded-[16px]">
                    <img
                      src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=85"
                      alt="Amber Fort Jaipur"
                      className="h-[230px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[350px]"
                    />
                  </div>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Amber Fort is one of Jaipur's most famous attractions.
                    Located on a hilltop, the fort offers spectacular views of
                    the surrounding landscape and showcases beautiful Rajput and
                    Mughal architecture.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Visitors can explore the grand courtyards, detailed
                    carvings, royal rooms and beautiful mirror work inside the
                    fort.
                  </p>
                </section>

                {/* TRAVEL TIP */}

                <div className="mt-7 rounded-[14px] border-l-4 border-[#008cff] bg-[#eef7fd] px-5 py-4">
                  <p className="text-[14px] leading-7 text-[#31536a]">
                    <strong>Travel Tip:</strong> Visit Amber Fort early in the
                    morning to avoid large crowds and enjoy the pleasant
                    weather.
                  </p>
                </div>

                {/* ================================================== */}
                {/* SECTION 3                                            */}
                {/* ================================================== */}

                <section className="mt-10">
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    Hawa Mahal
                  </h2>

                  <div className="mt-5 overflow-hidden rounded-[16px]">
                    <img
                      src="https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=85"
                      alt="Hawa Mahal Jaipur"
                      className="h-[230px] w-full object-cover transition-transform duration-500 hover:scale-[1.02] sm:h-[350px]"
                    />
                  </div>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Hawa Mahal is one of the most recognizable landmarks of
                    Jaipur. Its unique five-storey structure features hundreds
                    of small windows designed to allow cool air to pass through
                    the building.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    The beautiful pink and red sandstone facade makes Hawa Mahal
                    one of the most photographed places in the city.
                  </p>
                </section>

                {/* ================================================== */}
                {/* SECTION 4                                            */}
                {/* ================================================== */}

                <section className="mt-10">
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    City Palace
                  </h2>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    City Palace is another important attraction in Jaipur. The
                    palace complex combines traditional Rajput architecture with
                    Mughal influences.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Visitors can explore beautiful courtyards, museums, royal
                    rooms and historic collections while learning more about
                    Jaipur's royal heritage.
                  </p>
                </section>

                {/* ================================================== */}
                {/* SECTION 5                                            */}
                {/* ================================================== */}

                <section className="mt-10">
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    Jaipur Local Markets
                  </h2>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Jaipur is also famous for its colourful markets. Johari
                    Bazaar, Bapu Bazaar and Tripolia Bazaar are great places to
                    experience local shopping.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    You can find traditional jewellery, handicrafts, textiles,
                    footwear, pottery and many other Rajasthani products.
                  </p>
                </section>

                {/* ================================================== */}
                {/* SECTION 6                                            */}
                {/* ================================================== */}

                <section className="mt-10">
                  <h2 className="text-[23px] leading-tight font-bold text-[#172033] sm:text-[30px]">
                    Rajasthani Food You Must Try
                  </h2>

                  <p className="mt-5 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    A trip to Jaipur is incomplete without trying traditional
                    Rajasthani food. Dal Baati Churma, Gatte Ki Sabzi, Ker
                    Sangri and traditional sweets are popular choices.
                  </p>

                  <p className="mt-4 text-[15px] leading-8 text-gray-600 sm:text-[16px]">
                    Local restaurants and traditional dining experiences offer a
                    great way to enjoy the flavours of Rajasthan.
                  </p>
                </section>

                {/* ================================================== */}
                {/* QUICK CHECKLIST                                      */}
                {/* ================================================== */}

                {/* ================================================== */}
                {/* AUTHOR                                               */}
                {/* ================================================== */}

                <div className="mt-10 flex flex-col gap-4 rounded-[18px] border border-gray-100 bg-[#fafcff] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf6ff] text-lg text-[#008cff]">
                      <UserOutlined />
                    </div>

                    <div>
                      <p className="text-[12px] text-gray-400">Written by</p>

                      <p className="text-[15px] font-bold text-[#172033]">
                        Pan Journey
                      </p>

                      <p className="text-[12px] text-gray-400">
                        Travel & Destination Guide
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleShare}
                    icon={<ShareAltOutlined />}
                    className="!h-[42px] !rounded-lg !border-gray-200 !font-semibold"
                  >
                    Share Article
                  </Button>
                </div>

                {/* ================================================== */}
                {/* BOTTOM NAVIGATION                                    */}
                {/* ================================================== */}

                <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => router.push("/blog")}
                    className="!h-[44px] !rounded-lg !border-gray-200 !font-semibold"
                  >
                    Back to All Articles
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => router.push("/")}
                    className="buttion-background-color !h-[44px] !rounded-lg !border-none !font-semibold !text-white"
                  >
                    Explore Pan Journey
                  </Button>
                </div>
              </div>
            </article>

            {/* ====================================================== */}
            {/* SIDEBAR                                                 */}
            {/* ====================================================== */}
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* NEWSLETTER                                                   */}
      {/* ============================================================ */}

      

      <NewsletterSection />
    </>
  );
};

export default JaipurBlogPage;
